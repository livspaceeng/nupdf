import { createDocument } from "./document.js";
import { createTools } from "./tools.js";

export function mount(editor, preview) {
  const { doc, stream } = createDocument();

  stream.on('finish', function() {
    const blob = stream.toBlob('application/pdf');
    const url = stream.toBlobURL('application/pdf');
    preview.src = url;
  });
  return { editor, preview };
}
