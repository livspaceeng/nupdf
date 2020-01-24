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

  stream.on('finish', function() {
    const blob = stream.toBlob('application/pdf');

    const url = stream.toBlobURL('application/pdf');
    iframe.src = url;
  });

  paint(pdfdoc.root, doc)
  .then(() => doc.end())
}

function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(ev) { resolve(ev.target.result) }
    reader.readAsDataURL(blob);
  })
}

function paint(node, doc) {
  return new Promise((resolve, reject) => {
    let elementRenderPromise;
    switch (node.type) {
      case 'root':
        elementRenderPromise = Promise.resolve();
        break;
      case 'page': {
        doc.addPage();
        elementRenderPromise = Promise.resolve();
        break;
      }
      case 'text': {
        const {value, x, y, options} = node.attributes;
        doc.text(value, x, y, options);
        elementRenderPromise = Promise.resolve();
        break;
      }
      case 'image': {
        const {url, x, y, options} = node.attributes;
        elementRenderPromise = fetch(url)
        .then(response => response.blob())
        .then(blob => blobToDataURL(blob))
        .then(dataUrl => {
          doc.image(dataUrl, x, y, options)
        });
        break;
      }
      case 'rect': {
        const {x, y, width, height} = node.attributes;
        doc.rect(x, y, width, height);
        doc.stroke();
        elementRenderPromise = Promise.resolve();
        break;
      }
      default:
        throw new Error('Unknown node type in tree!');
    }

    let childrenRenderPromises = []

    if (node.children) {
      childrenRenderPromises = node.children.map((child, index) => {
        if (node.type === 'root' && child.type === 'page' && index === 0) {
          return child.children.map(grandchild => paint(grandchild, doc));
        } else {
          return paint(child, doc);
        }
      });
      childrenRenderPromises = childrenRenderPromises.flat(Infinity);
    }
    childrenRenderPromises.push(elementRenderPromise);
    return Promise.all(childrenRenderPromises).then(() => resolve());
  })
}
