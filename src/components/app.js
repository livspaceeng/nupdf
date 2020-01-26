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
              rotation: 0,
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
            value: 'Add text...',
            fontSize: 12,
            font: 'Helvetica',
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
      } else if (type === 'rect') {
        const rectElement = {
          type: 'rect',
          attributes: {
            x: 300,
            y: 300,
            width: 200,
            height: 100,
            options: {
              lineWidth: 1,
              opacity: 0.5,
              fill: "#000000",
              border: "#000000"
            }
          }
        };
        const newchildren = page.children.concat(rectElement);
        this.$set(page, 'children', newchildren);
        this.$root.$emit('change');
      }
    }
  }
}
