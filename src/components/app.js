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
        <ToolBar @change="update"/>
      </template>
      <Document :pages="tree.children"/>
    </EditorBackground>
  `,
  methods: {
    update({type, data}) {
      const page = tree.children[0];
      if (type === 'image') {
        const imageElement = {
          type: 'image',
          attributes: {
            file: data,
            x: 300,
            y: 300,
            options: {
              width: 300
            }
          }
        };
        const newchildren = page.children.concat(imageElement);
        this.$set(page, 'children', newchildren);
        this.$root.$emit('change');
      } else if (type === 'text') {
        const textElement = {
          type: 'text',
          attributes: {
            value: 'Some text here some other text happens here and then some more',
            x: 300,
            y: 300,
            options: {
              width: 300
            }
          }
        };
        const newchildren = page.children.concat(textElement);
        this.$set(page, 'children', newchildren);
        this.$root.$emit('change');
      }
    }
  }
}
