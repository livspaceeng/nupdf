import blobStream from "blob-stream";

import PDFDocument from "./pdfkit.standalone.js";

export function createDocument() {
  const doc = new PDFDocument();
  const stream = doc.pipe(blobStream());

  doc.text('Here we go again!');

  doc.addPage();

  doc.text('Some other text', 500, 500);
  doc.end();

  return { doc, stream };
}
