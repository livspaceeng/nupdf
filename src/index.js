import Vue from "vue";

import { render, doc } from "./pdfKitRenderer.js";
// import { mount } from "./mount.js";
import App from "./components/app.js";

const handlers = {
  set: function(obj, prop, value) {
    // console.log(`Setting ${prop} to ${value} in `, obj)
    return Reflect.set(obj, prop, value);
  }
};

// const documentJSON = {
//   type: 'root',
//   pageHeight: 791,
//   pageWidth: 611,
//   children: [
//     {
//       type: 'page',
//       children: [
//         {
//           type: 'text',
//           attributes: {
//             value: 'Here is some text with a line break and a tab',
//             fontSize: 12,
//             font: 'Helvetica',
//             x: 0,
//             y: 0,
//             editing: false,
//             options: {
//               width: 300
//             }
//           }
//         },
//         {
//           type: 'image',
//           attributes: new Proxy({
//             url: '/img1.png',
//             x: 0,
//             y: 0,
//             options: {
//               rotation: 20,
//               width: 300
//             }
//           }, handlers)
//         },
//         {
//           type: 'rect',
//           attributes: {
//             x: 0,
//             y: 0,
//             width: 200,
//             height: 100,
//             options: {
//               lineWidth: 1,
//               opacity: 0.5,
//               fill: "#000000",
//               border: "#000000"
//             }
//           }
//         }
//       ]
//     },
//     {
//       type: 'page',
//       children: [
//         {
//           type: 'text',
//           attributes: {
//             value: 'Here we go again!',
//             fontSize: 12,
//             font: 'Helvetica',
//             x: 100,
//             y: 100,
//             editing: false,
//             options: {
//               width: 300
//             }
//           }
//         },
//         {
//           type: 'text',
//           attributes: {
//             value: 'o',
//             fontSize: 12,
//             font: 'Helvetica',
//             x: 605,
//             y: 782,
//             editing: false,
//             options: {
//               width: 100
//             }
//           }
//         }
//       ]
//     },
//     {
//       type: 'page',
//       children: []
//     }
//   ]
// };

const documentJSON = {
  type: 'root',
  pageHeight: 791,
  pageWidth: 611,
  children: []
};

export const tree = documentJSON;// new Proxy(documentJSON, handlers);

function setup() {
  const iframe = document.querySelector('.render');
  const editor = document.querySelector('.editor');

  mount(tree, editor, iframe);
}

function mount(root, editorNode, pdfNode) {

  const pdfdoc = doc(root, pdfNode);

  // render(pdfdoc)

  const editor = new Vue({
    el: editorNode,
    components: { App },
    template: `<App />`
  });

  editor.$on('change', () => {
    render(pdfdoc)
  })
}

window.onload = () => setup();
