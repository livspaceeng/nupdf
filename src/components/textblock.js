export default {
  template: `
    <div
      class="textblock hoverborder"
      @mousedown="mousedown"
      @mouseenter="setHovered(true)"
      @mouseleave="setHovered(false)"
      :style="{
        position: 'absolute',
        left: content.attributes.x,
        top: content.attributes.y,
        width: content.attributes.options.width
      }"
    >
      {{ content.attributes.value }}
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
    </div>
  `,
  props: {
    content: {}
  },
  data: () => ({
    hovered: false
  }),
  methods: {
    mousedown(event) {
      this.$emit('pointerdown', {
        type: 'imagetap',
        x: event.x,
        y: event.y,
        docnode: this.content
      });
    },

    startTopResize(event) {
      event.stopPropagation();
      this.$emit('pointerdown', {
        type: 'imageresize-top',
        x: event.x,
        y: event.y,
        docnode: this.content
      });
    },

    startBottomResize(event) {
      event.stopPropagation();
      this.$emit('pointerdown', {
        type: 'imageresize-bottom',
        x: event.x,
        y: event.y,
        docnode: this.content
      });
    },

    startLeftResize(event) {
      event.stopPropagation();
      this.$emit('pointerdown', {
        type: 'imageresize-left',
        x: event.x,
        y: event.y,
        docnode: this.content
      });
    },

    startRightResize(event) {
      event.stopPropagation();
      this.$emit('pointerdown', {
        type: 'imageresize-right',
        x: event.x,
        y: event.y,
        docnode: this.content
      });
    },

    setHovered(value) {
      this.hovered = value;
    }
  }
}
