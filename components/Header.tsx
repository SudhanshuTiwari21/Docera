"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import { Sun, Moon, ChevronDown, MoreVertical } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import {
  allImageToolsColumns,
  allPdfToolsColumns,
  convertPdfDropdownTools,
} from "@/lib/toolsData";

const topBarClass =
  "h-1.5 bg-[#3d2914] dark:bg-amber-950";

type DropdownId = "convert-pdf" | "all-image" | "all-pdf" | null;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownId>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!openDropdown) return;
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const mainNav = (
    <nav
      className="hidden h-full min-w-max items-center gap-2 sm:flex lg:gap-4"
      aria-label="Main navigation"
    >
      <Link
        href="/tools/resize-image-to-100kb"
        className="whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100 lg:px-3"
      >
        Resize Image
      </Link>
      <Link
        href="/tools/compress-image"
        className="whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100 lg:px-3"
      >
        Compress Image
      </Link>
      <Link
        href="/tools/pdf-compressor"
        className="whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100 lg:px-3"
      >
        Compress PDF
      </Link>

      {/* Convert PDF dropdown – hover to open (same as All PDF Tools) */}
      <div
        className="relative flex h-full items-center"
        ref={openDropdown === "convert-pdf" ? dropdownRef : undefined}
        onMouseEnter={() => setOpenDropdown("convert-pdf")}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-md px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100 lg:px-3"
          aria-expanded={openDropdown === "convert-pdf"}
          aria-haspopup="true"
        >
          <span className="whitespace-nowrap">Convert PDF</span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 transition ${openDropdown === "convert-pdf" ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
        {openDropdown === "convert-pdf" && (
          <ul className="menu absolute left-0 top-full z-[60] mt-1 min-w-[220px] rounded-box border border-base-300 bg-base-100 p-2 shadow-xl">
            {convertPdfDropdownTools.map(({ href, title, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-3 rounded-lg"
                  onClick={() => setOpenDropdown(null)}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* All Image Tools dropdown – hover to open */}
      <div
        className="relative flex h-full items-center"
        ref={openDropdown === "all-image" ? dropdownRef : undefined}
        onMouseEnter={() => setOpenDropdown("all-image")}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-md px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100 lg:px-3"
          aria-expanded={openDropdown === "all-image"}
          aria-haspopup="true"
        >
          <span className="whitespace-nowrap">All Image Tools</span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 transition ${openDropdown === "all-image" ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
        {openDropdown === "all-image" && (
          <div className="absolute right-0 top-full z-[60] mt-1 w-[min(90vw,680px)] max-w-[calc(100vw-2rem)] rounded-xl border border-base-300 bg-base-100 p-6 shadow-xl">
            <MegaMenuContent columns={allImageToolsColumns} onLinkClick={() => setOpenDropdown(null)} />
          </div>
        )}
      </div>

      {/* All PDF Tools dropdown */}
      <div
        className="relative flex h-full items-center"
        ref={openDropdown === "all-pdf" ? dropdownRef : undefined}
        onMouseEnter={() => setOpenDropdown("all-pdf")}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-md px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100 lg:px-3"
          aria-expanded={openDropdown === "all-pdf"}
          aria-haspopup="true"
          aria-controls="all-pdf-menu"
          id="all-pdf-trigger"
        >
          <span className="whitespace-nowrap">All PDF Tools</span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 transition ${openDropdown === "all-pdf" ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
        {openDropdown === "all-pdf" && (
          <MegaMenu
            id="all-pdf-menu"
            ariaLabelledby="all-pdf-trigger"
            columns={allPdfToolsColumns}
            onLinkClick={() => setOpenDropdown(null)}
          />
        )}
      </div>
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      {/* Top dark strip */}
      <div className={topBarClass} aria-hidden />

      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 pl-6 pr-6 sm:pl-8 sm:pr-8 lg:gap-8 lg:pl-10 lg:pr-10">
        <Link
          href="/"
          className="mr-6 shrink-0 text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 lg:mr-8 lg:text-xl"
          aria-label="Dockera – Home"
        >
          Dockera
        </Link>

        {/* Desktop: center nav – overflow-visible so dropdowns extend below (overflow-x-auto clips them) */}
        <div className="hidden min-w-0 flex-1 justify-start overflow-visible sm:flex sm:h-full">
          {mainNav}
        </div>

        {/* Right: Pricing, Login, Sign up, theme, mobile menu – z-10 + bg so it stays on top of nav overflow */}
        <div className="relative z-10 ml-auto flex shrink-0 items-center gap-2 bg-white pl-6 dark:bg-slate-900 sm:gap-3">
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/pricing"
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:outline-slate-100"
            >
              Sign up
            </Link>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" aria-hidden />
            ) : (
              <Sun className="h-5 w-5" aria-hidden />
            )}
          </button>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 sm:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <MoreVertical className="h-6 w-6" aria-hidden />
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      <div
        id="mobile-nav"
        className={`border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 sm:hidden ${
          mobileOpen ? "block" : "hidden"
        }`}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col px-4 py-3" aria-label="Main navigation">
          <Link
            href="/tools/resize-image-to-100kb"
            className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            onClick={() => setMobileOpen(false)}
          >
            Resize Image
          </Link>
          <Link
            href="/tools/compress-image"
            className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            onClick={() => setMobileOpen(false)}
          >
            Compress Image
          </Link>
          <Link
            href="/tools/pdf-compressor"
            className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            onClick={() => setMobileOpen(false)}
          >
            Compress PDF
          </Link>
          <MobileDropdownSection
            title="Convert PDF"
            tools={convertPdfDropdownTools}
            onLinkClick={() => setMobileOpen(false)}
          />
          <MobileDropdownSection
            title="All Image Tools"
            columns={allImageToolsColumns}
            onLinkClick={() => setMobileOpen(false)}
          />
          <MobileDropdownSection
            title="All PDF Tools"
            columns={allPdfToolsColumns}
            onLinkClick={() => setMobileOpen(false)}
          />
          <div className="mt-2 flex gap-2 border-t border-slate-200 pt-3 dark:border-slate-700">
            <Link
              href="/login"
              className="flex-1 rounded-md border border-slate-300 px-3 py-2.5 text-center text-sm font-medium text-slate-700 dark:border-slate-600 dark:text-slate-300"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="flex-1 rounded-md bg-slate-900 px-3 py-2.5 text-center text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900"
              onClick={() => setMobileOpen(false)}
            >
              Sign up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

type MegaMenuColumns = { heading: string; tools: { href: string; title: string; icon: LucideIcon }[] }[];

function MegaMenuContent({ columns, onLinkClick }: { columns: MegaMenuColumns; onLinkClick?: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
      {columns.map((col) => (
        <div key={col.heading}>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {col.heading}
          </h3>
          <ul className="space-y-1">
            {col.tools.map(({ href, title, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-3 rounded-md py-2 pr-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700"
                  onClick={onLinkClick}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

type MegaMenuProps = {
  id: string;
  ariaLabelledby: string;
  columns: MegaMenuColumns;
  onLinkClick: () => void;
};

function MegaMenu({ id, ariaLabelledby, columns, onLinkClick }: MegaMenuProps) {
  return (
    <div
      id={id}
      role="menu"
      aria-labelledby={ariaLabelledby}
      className="absolute right-0 top-full z-[60] mt-1 w-[min(90vw,680px)] max-w-[calc(100vw-2rem)] rounded-xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-800"
    >
      <MegaMenuContent columns={columns} onLinkClick={onLinkClick} />
    </div>
  );
}

function MobileDropdownSection({
  title,
  onLinkClick,
  tools,
  columns,
}: {
  title: string;
  onLinkClick: () => void;
  tools?: { href: string; title: string; icon: LucideIcon }[];
  columns?: { heading: string; tools: { href: string; title: string; icon: LucideIcon }[] }[];
}) {
  const [open, setOpen] = useState(false);
  if (tools) {
    return (
      <div className="border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-medium text-slate-600 dark:text-slate-400"
          onClick={() => setOpen((o) => !o)}
        >
          {title}
          <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <ul className="space-y-0.5 pb-2 pl-3">
            {tools.map(({ href, title: t, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-slate-600 dark:text-slate-400"
                  onClick={onLinkClick}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden />
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  if (columns) {
    return (
      <div className="border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-medium text-slate-600 dark:text-slate-400"
          onClick={() => setOpen((o) => !o)}
        >
          {title}
          <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="space-y-4 pb-2 pl-3">
            {columns.map((col) => (
              <div key={col.heading}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {col.heading}
                </h4>
                <ul className="mt-1 space-y-0.5">
                  {col.tools.map(({ href, title: t, icon: Icon }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-slate-600 dark:text-slate-400"
                        onClick={onLinkClick}
                      >
                        <Icon className="h-4 w-4 shrink-0" aria-hidden />
                        {t}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  return null;
}
