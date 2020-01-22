import blobStream from "blob-stream";
import Vue from "vue";

import PDFDocument from "./pdfkit.standalone.js";
import { mount } from "./mount.js";
import App from "./components/app.js";

function setup() {
  const iframe = document.querySelector('iframe');
  const editor = document.querySelector('.editor');

  mount(editor, iframe);

  new Vue({
    el: editor,
    components: {
      App
    },
    template: `<App />`
  });
}

window.onload = () => setup();
