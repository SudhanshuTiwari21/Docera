import Link from "next/link";

const toolLinks = [
  { href: "/tools", label: "All tools" },
  { href: "/tools/image-tools", label: "Image tools" },
  { href: "/tools/pdf-tools", label: "PDF tools" },
];

const guideLinks = [
  { href: "/guides", label: "Guides" },
];

const legalLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-neutral-800 dark:bg-black/50">
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
          <section aria-label="Guides">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Guides
            </h3>
            <ul className="mt-4 space-y-2">
              {guideLinks.map(({ href, label }) => (
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
              {legalLinks.map(({ href, label }) => (
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
          <section aria-label="Contact">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Contact
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="mailto:info@dockera.in"
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  info@dockera.in
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-8 dark:border-neutral-800">
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            © {currentYear} Dockera. Free online document and image tools for
            India.
          </p>
        </div>
      </div>
    </footer>
  );
}
