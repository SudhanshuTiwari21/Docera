/**
 * Single source of truth for the DocChat FAQ.
 * Rendered visibly on /chat (FaqAccordion) AND emitted as FAQPage JSON-LD in
 * DocChatStructuredData. Keep them driven by this list so the structured data
 * always matches on-page content (Google requires FAQ markup to reflect visible text).
 */
export const docChatFaqs = [
  {
    q: "Can I chat with a PDF online for free?",
    a: "Yes. DocChat on Dockera lets you upload PDF or Word documents and ask questions in plain English. Chat messages are free; the free plan includes up to three indexed documents with a per-file size limit.",
  },
  {
    q: "How do I ask questions about my PDF or study notes?",
    a: "Sign in, open DocChat, upload your PDF or .docx file, wait for indexing, then type your question or ask for a summary. Replies use text extracted from your file.",
  },
  {
    q: "Is DocChat good for UPSC, SSC, or banking exam preparation?",
    a: "You can upload your notes, PYQs, or compilations and ask for explanations, summaries, or clarifications. Answers are based on the content you provide—not live exam updates—so always verify against official sources.",
  },
  {
    q: "Does DocChat work with Word documents?",
    a: "Yes. You can upload .docx files (modern Word format). Legacy .doc files should be saved as .docx or PDF first.",
  },
  {
    q: "What is the difference between free and Pro DocChat?",
    a: "Both plans include unlimited chat. On the free plan you can index up to three documents with a smaller maximum file size. Pro includes unlimited document uploads and larger file sizes.",
  },
] as const;
