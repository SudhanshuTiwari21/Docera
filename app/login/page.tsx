"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";
  const errorParam = searchParams.get("error");

  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/auth/login/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStep("otp");
      } else {
        setStatus("error");
        setError(data.error ?? "Failed to send OTP");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong");
    } finally {
      setStatus("idle");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/auth/login/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        window.location.href = redirect;
      } else {
        setStatus("error");
        setError(data.error ?? "Invalid OTP");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong");
    } finally {
      setStatus("idle");
    }
  };

  const errorMessages: Record<string, string> = {
    "invalid-token": "Invalid or expired link. Please request a new one.",
    "missing-token": "Missing verification link.",
    "user-not-found": "User not found. Please sign up first.",
    "server-error": "Server error. Please try again.",
  };
  const displayError = error ?? (errorParam ? errorMessages[errorParam] ?? null : null);

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          {step === "email" ? "Log in" : "Enter your code"}
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {step === "email"
            ? "We'll send a one-time code to your email. No password needed."
            : `We sent a 6-digit code to ${email}.`}
        </p>

        {step === "email" ? (
          <form onSubmit={handleSendOtp} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input input-bordered w-full"
                autoComplete="email"
              />
            </div>
            {displayError && (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {displayError}
              </p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn btn-primary w-full"
            >
              {status === "loading" ? "Sending…" : "Send code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
            <div>
              <label htmlFor="otp" className="label">
                <span className="label-text">6-digit code</span>
              </label>
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                required
                className="input input-bordered w-full text-center text-lg tracking-widest"
                autoComplete="one-time-code"
              />
            </div>
            {displayError && (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {displayError}
              </p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn btn-primary w-full"
            >
              {status === "loading" ? "Verifying…" : "Verify and log in"}
            </button>
            <button
              type="button"
              onClick={() => { setStep("email"); setOtp(""); setError(null); }}
              className="btn btn-ghost w-full"
            >
              Use a different email
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-slate-900 dark:text-slate-200">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="text-center text-slate-600 dark:text-slate-400">Loading…</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
