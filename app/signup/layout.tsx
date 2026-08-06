import type { Metadata } from "next";
import { getDefaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Sign up | Dockera",
    description: "Create your Dockera account. Passwordless signup with email verification.",
    path: "/signup",
    noIndex: true,
  }),
  // Keep the page crawlable for internal link discovery, but out of the index.
  robots: { index: false, follow: true },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
