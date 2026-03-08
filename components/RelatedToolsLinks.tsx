import { InternalLinksSection } from "@/components/common/InternalLinksSection";
import {
  resizeToolLinks,
  pdfToolLinks,
  examPhotoGuidesLinks,
  toolHubLinks,
} from "@/lib/internalLinks";

type SectionHeadingLevel = 2 | 3;

/** Renders the standard internal link sections for tool and guide pages (image tools, PDF tools, exam guides, hubs). */
export function RelatedToolsLinks({
  headingLevel = 2,
}: {
  headingLevel?: SectionHeadingLevel;
}) {
  return (
    <div className="space-y-8">
      <InternalLinksSection
        title="Related Image Tools"
        links={resizeToolLinks}
        headingLevel={headingLevel}
      />
      <InternalLinksSection
        title="PDF Tools"
        links={pdfToolLinks}
        headingLevel={headingLevel}
      />
      <InternalLinksSection
        title="Exam Photo Guides"
        links={examPhotoGuidesLinks}
        headingLevel={headingLevel}
      />
      <InternalLinksSection
        title="Tool & guide hubs"
        links={toolHubLinks}
        headingLevel={headingLevel}
      />
    </div>
  );
}
