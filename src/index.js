import blobStream from "blob-stream";
import Vue from "vue";

import { render, doc } from "./pdfKitRenderer.js";
// import { mount } from "./mount.js";
import App from "./components/app.js";

function setup() {
  const iframe = document.querySelector('.render');
  const editor = document.querySelector('.editor');

  const tree = {
    type: 'root',
    children: [
      {
        type: 'page',
        children: [
          {
            type: 'text',
            attributes: {
              value: 'fkdsalf fdkfas fdsklfsla fksfksiraruewrbe jf nas fklada fds fa fkalfa flsf',
              x: 0,
              y: 0,
              options: {
                width: 300
              }
            }
          },
          {
            type: 'rect',
            attributes: {
              x: 0,
              y: 0,
              width: 300,
              height: 100
            }
          }
        ]
      },
      {
        type: 'page',
        children: [
          {
            type: 'text',
            attributes: {
              value: 'Here we go again!'
            }
          },
          {
            type: 'text',
            attributes: {
              value: 'o',
              x: 605,
              y: 782
            }
          }
        ]
      },
      {
        type: 'page',
        children: []
      }
    ]
  };

  mount(tree, editor, iframe);
}

function mount(root, editorNode, pdfNode) {
  // new Vue({
  //   el: editorNode,
  //   components: { App },
  //   template: `<App />`,
  //   data: root
  // });

  const pdfdoc = doc(root, pdfNode);
  render(pdfdoc);
}

window.onload = () => setup();
