import TextBlock from "./textblock.js";
import ImageRenderer from "./imageRenderer.js";
import Rectangle from "./rectangle.js";

export default {
  template: `
    <div class="page"
      @mouseup="handleup"
      @mousemove="handlemove"
    >
      <span v-for="element in page.children">
        <TextBlock
          v-if="element.type === 'text'"
          :content="element"
          @pointerdown="handledown"
        />

        <ImageRenderer
          v-else-if="element.type === 'image'"
          :content="element"
          @pointerdown="handledown"
        />

        <Rectangle
          v-else-if="element.type === 'rect'"
          :content="element"
        />
      </span>
    </div>
  `,
  components: {
    TextBlock,
    ImageRenderer,
    Rectangle,
  },
  props: {
    page: {}
  },
  data() {
    return {
      mouseIsDown: false,
      mouseDownAt: { x: 0, y: 0 },
      startEvent: '',
      docNode: null,
      nodeStartAttributes: {x: 0, y: 0},
      typer: null
    };
  },
  methods: {
    handledown(event) {
      this.mouseIsDown = true;
      this.mouseDownAt = { x: event.x, y: event.y };
      this.startEvent = event.type;
      this.docnode = event.docnode;
      this.nodeStartAttributes = JSON.parse(JSON.stringify(event.docnode.attributes));
    },
    handleup(event) {
      this.mouseIsDown = false;
      // this.$root.$emit('change');
    },
    createTyper(event) {
      this.typer = (event) => {
        event.preventDefault();
        if (event.code === "Enter") {
          this.docnode.attributes.value += "\n";
        } else if (event.code === "Space") {
          this.docnode.attributes.value += " ";
        } else if (event.code === "Backspace") {
          const value = this.docnode.attributes.value;
          this.docnode.attributes.value = value.substr(0, value.length - 1);
        } else {
          this.docnode.attributes.value += event.key;
        }

      }
      return this.typer;
    },
    handlemove(event) {
      if (this.mouseIsDown) {
        const dx = event.x - this.mouseDownAt.x;
        const dy = event.y - this.mouseDownAt.y;

        if (this.startEvent === 'imagetap') {
          this.docnode.attributes.x = this.nodeStartAttributes.x + dx;
          this.docnode.attributes.y = this.nodeStartAttributes.y + dy;
        } else if (this.startEvent === 'texttap') {
          this.docnode.attributes.x = this.nodeStartAttributes.x + dx;
          this.docnode.attributes.y = this.nodeStartAttributes.y + dy;
          this.docnode.attributes.editing = true;
          if (this.typer == null) {
            event.target.addEventListener('keydown', this.createTyper());
            event.target.addEventListener('blur',
              () => {
                event.target.removeEventListener('keydown', this.typer);
                delete this.docnode.attributes.editing;
                this.typer = null;
              }
            , {once: true})
          }
        } else if (this.startEvent === 'imageresize-right') {
          this.docnode.attributes.options.width = this.nodeStartAttributes.options.width + dx;
        } else if (this.startEvent === 'imageresize-left') {
          this.docnode.attributes.options.width = this.nodeStartAttributes.options.width - dx;
        } else if (this.startEvent === 'imageresize-top') {
          this.docnode.attributes.options.width = this.nodeStartAttributes.options.width - dy;
        } else if (this.startEvent === 'imageresize-bottom') {
          this.docnode.attributes.options.width = this.nodeStartAttributes.options.width + dy;
        }
      }
    }
  }
}
