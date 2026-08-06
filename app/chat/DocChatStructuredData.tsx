import { docChatFaqs } from "./faqData";

/**
 * JSON-LD for Google rich results: WebApplication + FAQ targeting common search intents.
 * The FAQ is sourced from the same list rendered visibly on /chat, so the markup
 * always matches on-page content.
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
        mainEntity: docChatFaqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
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
