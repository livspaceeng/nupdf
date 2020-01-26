import ImageControls from "./imageControls.js";

export default {
  components: {
    ImageControls
  },
  template: `
    <span class="hoverborder image"
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
          width: content.attributes.options.width,
          transform: 'rotateZ(' + content.attributes.options.rotation + 'Deg)'
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
      <ImageControls
        v-if="content.attributes.editing"
        :content="content"
        @close="closeEditor"/>
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

    closeEditor() {
      this.$emit('pointerdown', {
        type: 'imagesave',
        x: event.x,
        y: event.y,
        docnode: this.content,
        el: null
      });
    },

    setHovered(value) {
      this.hovered = value;
    }
  }
}
