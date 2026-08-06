import type { Metadata } from "next";
import { getDefaultMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "Log in | Dockera",
    description: "Log in to Dockera with your email. Passwordless login with one-time code.",
    path: "/login",
    noIndex: true,
  }),
  // Keep the page crawlable for internal link discovery, but out of the index.
  robots: { index: false, follow: true },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
