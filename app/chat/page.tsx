import type { Metadata } from "next";
import Link from "next/link";
import {
  Upload,
  FileText,
  Lock,
  MessageSquare,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { getDefaultMetadata } from "@/lib/seo";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ChatClient } from "@/components/chat/ChatClient";
import { docChatFaqs } from "./faqData";

export const metadata: Metadata = {
  ...getDefaultMetadata({
    title: "DocChat — Chat with PDF & Word Online (Free AI) | Dockera",
    description:
      "Free AI chat for PDF and Word (.docx). Ask questions, get summaries, and study with your notes—UPSC, SSC, banking & school prep. Answers grounded in your files. Unlimited messages.",
    keywords: [
      "DocChat",
      "chat with PDF online",
      "AI PDF chat",
      "ask questions about PDF",
      "PDF chatbot India",
      "chat with Word document online",
      "docx chat AI",
      "PDF Q&A tool",
      "document chatbot",
      "AI study assistant PDF",
      "UPSC notes chat AI",
      "SSC exam PDF assistant",
      "read PDF with AI",
      "summarize PDF online free",
      "Dockera DocChat",
      "RAG PDF chat",
      "PDF question answering",
    ],
    path: "/chat",
  }),
};

const steps = [
  {
    icon: Upload,
    title: "Upload your document",
    body: "Sign in and add a PDF or Word (.docx) file—exam notes, a report, a research paper, or a government circular.",
  },
  {
    icon: Sparkles,
    title: "We index the text",
    body: "DocChat extracts and indexes the text from your file so answers are grounded in what the document actually says.",
  },
  {
    icon: MessageSquare,
    title: "Ask anything",
    body: "Ask questions in plain English or request a summary. Replies use the content of your file, not the open web.",
  },
] as const;

const useCases = [
  {
    icon: GraduationCap,
    title: "Exam prep & notes",
    body: "Upload UPSC, SSC, or banking notes, PYQs, and compilations, then ask for explanations, quick summaries, or clarifications while you revise.",
  },
  {
    icon: FileText,
    title: "Reports & research",
    body: "Drop in a long report or research PDF and pull out the key points, definitions, or a specific section without scrolling through every page.",
  },
  {
    icon: FileText,
    title: "Resumes & documents",
    body: "Ask DocChat to review a resume, contract, or policy document and explain what a section means in plain language.",
  },
  {
    icon: FileText,
    title: "Circulars & notifications",
    body: "Upload a government circular or exam notification and ask exactly what applies to you—then verify against the official source.",
  },
] as const;

/** Matches Header `h-14`; keeps the chat app tall while leaving room to scroll to the SEO content below. */
const CHAT_REGION = "h-[calc(100dvh-3.5rem)] min-h-[560px] w-full flex-shrink-0";

export default function ChatPage() {
  return (
    <div className="flex min-h-full w-full flex-1 flex-col bg-white dark:bg-black">
      {/* Interactive chat app — full-height, primary above-the-fold experience */}
      <section className={`flex flex-col overflow-hidden ${CHAT_REGION}`} aria-label="DocChat">
        <div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden">
          <ChatClient />
        </div>
      </section>

      {/* Server-rendered, crawlable marketing + FAQ content */}
      <div className="border-t border-slate-200 dark:border-neutral-800">
        <section className="mx-auto max-w-4xl px-4 pt-14 pb-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl lg:text-4xl">
            Chat with PDF &amp; Word documents online — free AI
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            DocChat lets you upload a PDF or Word (.docx) file and ask questions in plain
            English. It reads your document and answers from its actual text—built for exam
            preparation, notes, reports, and research. Chat messages are free and unlimited,
            with no app to install.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-700 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Start chatting free
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-5 py-3 text-base font-semibold text-slate-900 dark:text-slate-100 shadow-sm hover:bg-slate-50 dark:hover:bg-neutral-800 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              See free vs Pro
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="how-it-works">
          <h2 id="how-it-works" className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
            How DocChat works
          </h2>
          <ol className="mt-6 grid gap-6 sm:grid-cols-3">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <li
                key={title}
                className="rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 shadow-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  <span className="text-emerald-700 dark:text-emerald-400">{i + 1}.</span> {title}
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Formats, privacy, plans */}
        <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="formats-privacy">
          <h2 id="formats-privacy" className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
            Formats, privacy &amp; plans
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                <FileText className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Supported files</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Upload PDF and Word (.docx) documents. Legacy .doc files should be saved as
                .docx or PDF first. You can also chat without a file for general questions.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                <Lock className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Your files, your control</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Documents are indexed only so DocChat can answer from them. Answers are based
                on your uploaded content—always verify important details against official
                sources.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                <Sparkles className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Free vs Pro</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Both plans include unlimited chat. The free plan indexes up to three documents
                with a smaller maximum file size.{" "}
                <Link href="/pricing" className="font-medium text-emerald-700 dark:text-emerald-400 underline hover:no-underline">
                  Pro
                </Link>{" "}
                adds unlimited uploads and larger files.
              </p>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="use-cases">
          <h2 id="use-cases" className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
            What you can do with DocChat
          </h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {useCases.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="flex gap-4 rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 shadow-sm"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ — matches DocChat FAQPage JSON-LD exactly (shared docChatFaqs) */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <FaqAccordion
            faqs={docChatFaqs}
            accordionName="docchat-faq"
            heading="DocChat FAQs"
            subheading="Common questions about chatting with PDF and Word documents on Dockera."
          >
            Explore Dockera&apos;s{" "}
            <Link href="/tools" className="font-medium text-slate-900 dark:text-slate-200 underline underline-offset-2 hover:no-underline">
              PDF and image tools
            </Link>
            {" "}or read our{" "}
            <Link href="/guides" className="font-medium text-slate-900 dark:text-slate-200 underline underline-offset-2 hover:no-underline">
              guides
            </Link>
            .
          </FaqAccordion>
        </section>
      </div>
    </div>
  );
}
