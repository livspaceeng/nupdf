import ShapeControls from "./shapeControls.js";

export default {
  props: {
    content: {}
  },
  components: {
    ShapeControls
  },
  template: `
    <div ref="rect"
      class="rect hoverborder"
      :style="{
        border: 'solid ' + content.attributes.options.lineWidth + 'px ' + content.attributes.options.border,
        background: fillColor,
        position: 'absolute',
        left: content.attributes.x,
        top: content.attributes.y,
        width: content.attributes.width,
        height: content.attributes.height,
        cursor: 'pointer'
      }"
      @mousedown="mousedown"
      @mouseenter="setHovered(true)"
      @mouseleave="setHovered(false)"
    >
      <span class="handle handle-top"
        v-if="hovered"
        @mousedown="startTopResize"
      >
      </span>
      <span class="handle handle-bottom"
        v-if="hovered"
        @mousedown="startBottomResize"
      >
      </span>
      <span class="handle handle-left"
        v-if="hovered"
        @mousedown="startLeftResize"
      >
      </span>
      <span class="handle handle-right"
        v-if="hovered"
        @mousedown="startRightResize"
      >
      </span>
      <ShapeControls
        v-if="content.attributes.editing"
        :content="content"
        @close="closeEditor"/>
    </div>
  `,
  data: () => ({
    hovered: false
  }),
  computed: {
    fillColor() {
      const colornumber = this.content.attributes.options.fill.substr(1);
      const opacityInHex = parseInt(this.content.attributes.options.opacity * 15).toString(16);
      return `#${colornumber}${opacityInHex}${opacityInHex}`
    }
  },
  methods: {
    mousedown(event) {
      this.$emit('pointerdown', {
        type: 'recttap',
        x: event.x,
        y: event.y,
        docnode: this.content,
        el: this.$refs.rect
      });
    },

    startTopResize(event) {
      event.stopPropagation();
      this.$emit('pointerdown', {
        type: 'rectresize-top',
        x: event.x,
        y: event.y,
        docnode: this.content
      });
    },

    startBottomResize(event) {
      event.stopPropagation();
      this.$emit('pointerdown', {
        type: 'rectresize-bottom',
        x: event.x,
        y: event.y,
        docnode: this.content
      });
    },

    startLeftResize(event) {
      event.stopPropagation();
      this.$emit('pointerdown', {
        type: 'rectresize-left',
        x: event.x,
        y: event.y,
        docnode: this.content
      });
    },

    startRightResize(event) {
      event.stopPropagation();
      this.$emit('pointerdown', {
        type: 'rectresize-right',
        x: event.x,
        y: event.y,
        docnode: this.content
      });
    },

    setHovered(value) {
      this.hovered = value;
    },

    closeEditor() {
      this.$emit('pointerdown', {
        type: 'rectsave',
        x: event.x,
        y: event.y,
        docnode: this.content,
        el: this.$refs.rect
      });
    }
  }

}
