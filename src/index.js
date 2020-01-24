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
            children: [],
            attributes: {
              value: 'Here we go again!'
            }
          }
        ]
      },
      {
        type: 'page',
        children: [
          {
            type: 'text',
            children: [],
            attributes: {
              value: 'Here we go again!',
              x: 400,
              y: 400
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
