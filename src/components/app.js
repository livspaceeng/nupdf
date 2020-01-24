import EditorBackground from "./background.js";
import Document from "./document.js";
import ToolBar from "./toolbar.js";
import { tree } from "../index.js";

export default {
  data: () => {
    return { tree }
  },
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
      <Document :pages="tree.children"/>
    </EditorBackground>
  `
}
