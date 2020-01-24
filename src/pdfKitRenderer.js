import blobStream from "blob-stream";

import PDFDocument from "pdfkit";

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

  paint(pdfdoc.root, doc);

  doc.end();

  stream.on('finish', function() {
    const blob = stream.toBlob('application/pdf');

    const url = stream.toBlobURL('application/pdf');
    iframe.src = url;
  });
}

function paint(node, doc) {
  debugger
  switch (node.type) {
    case 'root':
      break;
    case 'page': {
      doc.addPage();
      break;
    }
    case 'text': {
      const {value, x, y} = node.attributes;
      doc.text(value, x, y);
      break;
    }
    default:
      throw new Error('Unknown node type in tree!');
  }

  node.children.map((child, index) => {
    if (node.type === 'root' && child.type === 'page' && index === 0) {
      child.children.map(grandchild => paint(grandchild, doc));
    } else {
      paint(child, doc);
    }
  });
}
