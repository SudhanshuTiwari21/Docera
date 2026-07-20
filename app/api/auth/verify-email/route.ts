import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { consumeVerificationToken } from "@/lib/verification";
import { createSessionToken, setSessionCookie } from "@/lib/auth";
import { checkAuthRateLimit, recordAuthAttempt } from "@/lib/authRateLimit";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dockera.in";

export async function GET(request: Request) {
  const allowed = await checkAuthRateLimit(request, "auth");
  if (!allowed) {
    return Response.redirect(`${SITE_URL}/login?error=too-many-requests`);
  }

  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return Response.redirect(`${SITE_URL}/login?error=missing-token`);
  }

  const result = await consumeVerificationToken(token);
  if (!result.ok) {
    const error = result.reason === "already-used" ? "link-already-used" : "invalid-token";
    return Response.redirect(`${SITE_URL}/login?error=${error}`);
  }
  const payload = result.payload;

  try {
    const rows = await query<{ id: string; email: string; tier: string }[]>(
      `UPDATE users SET email_verified_at = NOW(), updated_at = NOW()
       WHERE email = $1
       RETURNING id, email, tier`,
      [payload.email]
    );

    if (rows.length === 0) {
      return Response.redirect(`${SITE_URL}/login?error=user-not-found`);
    }

    const user = rows[0];
    const sessionToken = createSessionToken({ id: user.id, email: user.email, tier: user.tier });
    await setSessionCookie(sessionToken);
    await recordAuthAttempt(request, "auth");

    return Response.redirect(`${SITE_URL}/?verified=1`);
  } catch (err) {
    console.error("[verify-email]", err);
    return Response.redirect(`${SITE_URL}/login?error=server-error`);
  }
}
