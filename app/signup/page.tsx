"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setError(data.error ?? "Sign up failed");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Check your email
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            We sent a verification link to <strong>{email}</strong>. Click the link to verify your account.
          </p>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-500">
            Didn't receive it? Check spam or{" "}
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="font-medium text-slate-900 underline dark:text-slate-200"
            >
              try again
            </button>
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            ← Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          We'll send a verification link to your email. No password needed.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="label">
                <span className="label-text">First name</span>
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                maxLength={100}
                className="input input-bordered w-full"
                autoComplete="given-name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="label">
                <span className="label-text">Last name</span>
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                maxLength={100}
                className="input input-bordered w-full"
                autoComplete="family-name"
              />
            </div>
          </div>
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
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn btn-primary w-full"
          >
            {status === "loading" ? "Sending…" : "Sign up"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-slate-900 dark:text-slate-200">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
