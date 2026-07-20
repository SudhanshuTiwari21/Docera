/**
 * JSON-LD for Google rich results: WebApplication + FAQ targeting common search intents.
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */
export function DocChatStructuredData() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dockera.in").replace(/\/$/, "");
  const url = `${base}/chat`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#webapp`,
        name: "DocChat",
        alternateName: ["Dockera DocChat", "AI PDF chat"],
        url,
        applicationCategory: "UtilitiesApplication",
        applicationSubCategory: "DocumentManagementApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript. Modern browser recommended.",
        inLanguage: "en-IN",
        isAccessibleForFree: true,
        description:
          "Upload PDF or Word (.docx) files and chat with AI. Get answers grounded in your document text—ideal for exam prep, notes, reports, and study material.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        featureList: [
          "Chat with PDF documents online",
          "Ask questions about Word (.docx) files",
          "AI answers based on your uploaded document",
          "General chat without a file",
          "Free unlimited messages; free tier includes up to 3 indexed documents",
        ],
        provider: {
          "@type": "Organization",
          name: "Dockera",
          url: base,
          sameAs: base,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Can I chat with a PDF online for free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. DocChat on Dockera lets you upload PDF or Word documents and ask questions in plain English. Chat messages are free; the free plan includes up to three indexed documents with a per-file size limit.",
            },
          },
          {
            "@type": "Question",
            name: "How do I ask questions about my PDF or study notes?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sign in, open DocChat, upload your PDF or .docx file, wait for indexing, then type your question or ask for a summary. Replies use text extracted from your file.",
            },
          },
          {
            "@type": "Question",
            name: "Is DocChat good for UPSC, SSC, or banking exam preparation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can upload your notes, PYQs, or compilations and ask for explanations, summaries, or clarifications. Answers are based on the content you provide—not live exam updates—so always verify against official sources.",
            },
          },
          {
            "@type": "Question",
            name: "Does DocChat work with Word documents?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. You can upload .docx files (modern Word format). Legacy .doc files should be saved as .docx or PDF first.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between free and Pro DocChat?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Both plans include unlimited chat. On the free plan you can index up to three documents with a smaller maximum file size. Pro includes unlimited document uploads and larger file sizes.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
