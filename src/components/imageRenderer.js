export default {
  template: `
    <span class="hoverborder"
      :style="{
        position: 'absolute',
        left: content.attributes.x,
        top: content.attributes.y,
      }"
      @mouseenter="setHovered(true)"
      @mouseleave="setHovered(false)"
    >
      <img @mousedown="mousedown"
        draggable="false"
        :style="{
          width: content.attributes.options.width
        }"
        :src="imageurl"
      >
      </img>

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
    </span>
  `,
  props: {
    content: {}
  },
  computed: {
    imageurl() {
      if (this.content.attributes.url) {
        return this.content.attributes.url;
      } else if (this.content.attributes.file) {
        return URL.createObjectURL(this.content.attributes.file)
      }
    }
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

    doRightResize(event) {
      if (this.mouseisdown) {
        this.righthandle.up = {x: event.x, y: event.y};
        const dx = event.x - this.righthandle.down.x;
        this.content.attributes.options.width = this.righthandle.start.x + dx;
      }
    },

    startTopResize(event) {
      this.$emit('pointerdown', {
        type: 'imageresize-top',
        x: event.x,
        y: event.y,
        docnode: this.content
      });
    },

    startBottomResize(event) {
      this.$emit('pointerdown', {
        type: 'imageresize-bottom',
        x: event.x,
        y: event.y,
        docnode: this.content
      });
    },

    startLeftResize(event) {
      this.$emit('pointerdown', {
        type: 'imageresize-left',
        x: event.x,
        y: event.y,
        docnode: this.content
      });
    },

    startRightResize(event) {
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
