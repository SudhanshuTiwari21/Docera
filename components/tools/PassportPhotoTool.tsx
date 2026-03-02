"use client";

import { CropImageTool } from "@/components/tools/CropImageTool";

/** Passport photo = CropImageTool with 35:45 preset, JPEG output. */
export function PassportPhotoTool() {
  return (
    <section aria-labelledby="passport-photo-heading">
      <h2 id="passport-photo-heading" className="sr-only">
        Passport photo
      </h2>
      <CropImageTool defaultAspect={35 / 45} defaultOutputFormat="jpeg" />
    </section>
  );
}
