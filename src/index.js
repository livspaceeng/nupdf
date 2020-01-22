import blobStream from "blob-stream";

import PDFDocument from "./pdfkit.standalone.js";

function setup() {
  const iframe = document.querySelector('iframe');

  const doc = new PDFDocument();
  const stream = doc.pipe(blobStream());

  doc.text('Here we go again!');
  doc.addPage();

  doc.text('Some other text', 500, 500);
  doc.end();
  stream.on('finish', function() {
    const blob = stream.toBlob('application/pdf');
    const url = stream.toBlobURL('application/pdf');
    iframe.src = url;
    console.log(url);
  })
}

window.onload = () => setup();
