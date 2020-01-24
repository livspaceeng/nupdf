import Vue from "vue";

import { render, doc } from "./pdfKitRenderer.js";
// import { mount } from "./mount.js";
import App from "./components/app.js";

const documentJSON = {
  type: 'root',
  pageHeight: 791,
  pageWidth: 611,
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
          type: 'image',
          attributes: {
            url: '/img1.png',
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
            width: 200,
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
            value: 'Here we go again!',
            x: 100,
            y: 100,
            options: {
              width: 300
            }
          }
        },
        {
          type: 'text',
          attributes: {
            value: 'o',
            x: 605,
            y: 782,
            options: {
              width: 100
            }
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
const handlers = {};
export const tree = new Proxy(documentJSON, handlers);

function setup() {
  const iframe = document.querySelector('.render');
  const editor = document.querySelector('.editor');

  mount(tree, editor, iframe);
}

function mount(root, editorNode, pdfNode) {

  const pdfdoc = doc(root, pdfNode);

  render(pdfdoc);

  const editor = new Vue({
    el: editorNode,
    components: { App },
    template: `<App />`
  });
}

window.onload = () => setup();
