import TextControls from './textcontrols.js';

export default {
  components: {
    TextControls
  },
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
        width: content.attributes.options.width,
        'font-size': content.attributes.fontSize,
        'font-family': fontfamily
      }"
      tabindex="0"
      ref="textarea"
    >
      {{ content.attributes.value }}
      <span v-if="content.attributes.editing"
        class="cursor"
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
      <TextControls
        v-if="content.attributes.editing"
        :content="content"
        @close="closeEditor"/>
    </div>
  `,
  props: {
    content: {}
  },
  data: () => ({
    hovered: false
  }),
  computed: {
    fontfamily() {
      if (this.content.attributes.font.startsWith('/')) {
        return this.content.attributes.font.substr(1, this.content.attributes.font.length - 5);
      } else {
        return this.content.attributes.font;
      }
    }
  },
  methods: {
    mousedown(event) {
      this.$emit('pointerdown', {
        type: 'texttap',
        x: event.x,
        y: event.y,
        docnode: this.content,
        el: this.$refs.textarea
      });
    },

    startLeftResize(event) {
      event.stopPropagation();
      this.$emit('pointerdown', {
        type: 'imageresize-left',
        x: event.x,
        y: event.y,
        docnode: this.content,
        el: this.$refs.textarea
      });
    },

    startRightResize(event) {
      event.stopPropagation();
      this.$emit('pointerdown', {
        type: 'imageresize-right',
        x: event.x,
        y: event.y,
        docnode: this.content,
        el: this.$refs.textarea
      });
    },

    setHovered(value) {
      this.hovered = value;
    },

    closeEditor() {
      this.$emit('pointerdown', {
        type: 'textsave',
        x: event.x,
        y: event.y,
        docnode: this.content,
        el: this.$refs.textarea
      });
    }
  }
}
