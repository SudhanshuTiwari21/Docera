import type { ReactNode } from "react";
import { DocChatStructuredData } from "./DocChatStructuredData";

/**
 * The page owns its own layout: a full-height interactive chat region followed by
 * server-rendered, crawlable marketing + FAQ content. This wrapper only injects the
 * structured data and lets the document scroll normally so the SEO content is reachable.
 */
export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <div data-docchat-shell className="flex min-h-0 w-full flex-1 flex-col">
      <DocChatStructuredData />
      {children}
    </div>
  );
}
