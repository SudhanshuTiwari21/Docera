import Link from "next/link";

const toolLinks = [
  { href: "/tools/image-resizer", label: "Image Resizer" },
  { href: "/tools/pdf-compressor", label: "PDF Compressor" },
  { href: "/tools/passport-photo", label: "Passport Photo" },
  { href: "/tools/signature-extractor", label: "Signature Extractor" },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <section aria-label="Tools">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Tools
            </h3>
            <ul className="mt-4 space-y-2">
              {toolLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section aria-label="Legal">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </section>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-800">
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            © {currentYear} Dockera. Free online document and image tools for
            India.
          </p>
        </div>
      </div>
    </footer>
  );
}
