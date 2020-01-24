import blobStream from "blob-stream";

import PDFDocument from "./pdfkit.standalone.js";

export function doc(root, domNode) {
  return {
    root: root,
    el: domNode
  }
}

export function render(pdfdoc) {
  const iframe = document.createElement("iframe");
  pdfdoc.el.appendChild(iframe);

  const doc = new PDFDocument();
  const stream = doc.pipe(blobStream());

  doc.text('Here we go again!');

  doc.addPage();

  doc.text('Some other text', 500, 500);
  doc.end();

  stream.on('finish', function() {
    // get a blob you can do whatever you like with
    const blob = stream.toBlob('application/pdf');

    // or get a blob URL for display in the browser
    const url = stream.toBlobURL('application/pdf');
    iframe.src = url;
  });
}
