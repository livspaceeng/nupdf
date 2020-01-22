import EditorBackground from "./background.js";
import Document from "./document.js";
import ToolBar from "./toolbar.js";

export default {
  components: {
    EditorBackground,
    ToolBar,
    Document
  },
  template: `
    <EditorBackground>
      <template v-slot:toolbar>
        <ToolBar/>
      </template>
      <Document/>
    </EditorBackground>
  `
}
