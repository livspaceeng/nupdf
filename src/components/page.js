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
      nodeStartLocation: {x: 0, y: 0}
    };
  },
  methods: {
    handledown(event) {
      this.mouseIsDown = true;
      this.mouseDownAt = { x: event.x, y: event.y };
      this.startEvent = event.type;
      this.docnode = event.docnode;
      this.nodeStartLocation = {
        x: event.docnode.attributes.x,
        y: event.docnode.attributes.y
      };
    },
    handleup(event) {
      this.mouseIsDown = false;
      this.$root.$emit('change');
    },
    handlemove(event) {
      if (this.mouseIsDown) {
        if (this.startEvent === 'imagetap') {
          const dx = event.x - this.mouseDownAt.x;
          const dy = event.y - this.mouseDownAt.y;
          this.docnode.attributes.x = this.nodeStartLocation.x + dx;
          this.docnode.attributes.y = this.nodeStartLocation.y + dy;
        }
      }
    }
  }
}
