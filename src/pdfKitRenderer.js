import blobStream from "blob-stream";

import PDFDocument from "pdfkit";

export function doc(root, domNode) {
  return {
    root: root,
    el: domNode
  }
}

export async function render(pdfdoc) {
  let iframe = pdfdoc.el.querySelector('iframe');
  let spinner = pdfdoc.el.querySelector('.spinner');

  if (!iframe) {
    iframe = document.createElement("iframe");
    pdfdoc.el.appendChild(iframe);
  }

  if (!spinner) {
    spinner = document.createElement("div");
    spinner.classList.add("spinner");
    spinner.innerHTML = `<div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
    pdfdoc.el.appendChild(spinner);
  }

  spinner.style.display = 'flex';

  const doc = new PDFDocument();
  const stream = doc.pipe(blobStream());

  stream.on('finish', function() {
    const blob = stream.toBlob('application/pdf');

    const url = stream.toBlobURL('application/pdf');
    iframe.src = url;
    iframe.onload = () => {
      spinner.style.display = 'none';
    }

  });

  await paint(pdfdoc.root, doc)
  // .then(() => doc.end())
  doc.end();
}

function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(ev) { resolve(ev.target.result) }
    reader.readAsDataURL(blob);
  })
}

async function paint(root, doc) {
  let pagesPainted = 0;

  for (const page of root.children) {
    await paintPage(page, doc);

    if (++pagesPainted !== root.children.length) {
      doc.addPage();
    }
  }
  return doc;
}


async function paintPage(page, doc) {
  for (const node of page.children) {
    switch (node.type) {
      case 'text': {
        const {value, x, y, options} = node.attributes;
        doc.text(value, x, y, options);
        // elementRenderPromise = Promise.resolve();
        break;
      }
      case 'image': {
        const {url, file, x, y, options} = node.attributes;
        // elementRenderPromise = fetch(url)
        // .then(response => response.blob())
        // .then(blob => blobToDataURL(blob))
        // .then(dataUrl => {
        //   doc.image(dataUrl, x, y, options)
        // });
        if (url) {
          const response = await fetch(url);
          const blob = await response.blob();
          const dataUrl = await blobToDataURL(blob);
          doc.image(dataUrl, x, y, options);
        } else if (file) {
          const dataUrl = await blobToDataURL(file);
          doc.image(dataUrl, x, y, options);
        } else {
          throw new Error('Unknown image node');
        }
        break;
      }
      case 'rect': {
        const {x, y, width, height} = node.attributes;
        doc.rect(x, y, width, height);
        doc.stroke();
        // elementRenderPromise = Promise.resolve();
        break;
      }
      default:
        throw new Error('Unknown node type in tree!');
    }
  }
  return doc;
}
