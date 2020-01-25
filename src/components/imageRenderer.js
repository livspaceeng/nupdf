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
        @mouseup="mouseup"
        @mousemove="move"
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
        @mouseup="endTopResize"
        @mousemove="doTopResize"
      >
      </span>
      <span class="handle handle-bottom"
        v-if="hovered"
        @mousedown="startBottomResize"
        @mouseup="endBottomResize"
        @mousemove="doBottomResize"
      >
      </span>
      <span class="handle handle-left"
        v-if="hovered"
        @mousedown="startLeftResize"
        @mouseup="endLeftResize"
        @mousemove="doLeftResize"
      >
      </span>
      <span class="handle handle-right"
        v-if="hovered"
        @mousedown="startRightResize"
        @mouseup="mouseup"
        @mousemove="doRightResize"
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
    mouseisdown: false,
    down: { x: 0, y: 0 },
    up: { x: 0, y: 0 },
    start: { x: 0, y: 0 },
    tophandle: {
      down: { x: 0, y: 0 },
      up: { x: 0, y: 0 },
      start: { x: 0, y: 0 }
    },
    bottomhandle: {
      down: { x: 0, y: 0 },
      up: { x: 0, y: 0 },
      start: { x: 0, y: 0 }
    },
    lefthandle: {
      down: { x: 0, y: 0 },
      up: { x: 0, y: 0 },
      start: { x: 0, y: 0 }
    },
    righthandle: {
      down: { x: 0, y: 0 },
      up: { x: 0, y: 0 },
      start: { x: 0, y: 0 }
    },
    hovered: false
  }),
  methods: {
    mousedown(event) {
      this.$emit('pointerdown', { type: 'imagetap', x: event.x, y: event.y, docnode: this.content })
      // this.down = {x: event.x, y: event.y};
      // this.mouseisdown = true;
      // this.start.x = this.content.attributes.x;
      // this.start.y = this.content.attributes.y;
    },
    mouseup(event) {
      // this.mouseisdown = false;
      // this.$root.$emit('change');
    },
    move() {
      // if (this.mouseisdown) {
      //   this.up = {x: event.x, y: event.y};
      //   const dx = this.up.x - this.down.x;
      //   const dy = this.up.y - this.down.y;
      //   this.content.attributes.x = this.start.x + dx;
      //   this.content.attributes.y = this.start.y + dy;
      //   // console.log(dx, dy);
      // }
    },

    doRightResize(event) {
      if (this.mouseisdown) {
        this.righthandle.up = {x: event.x, y: event.y};
        const dx = event.x - this.righthandle.down.x;
        this.content.attributes.options.width = this.righthandle.start.x + dx;
      }
    },

    startTopResize(event) {},
    endTopResize(event) {},
    doTopResize(event) {},

    startBottomResize(event) {},
    endBottomResize(event) {},
    doBottomResize(event) {},

    startLeftResize(event) {},
    endLeftResize(event) {},
    doLeftResize(event) {},

    startRightResize(event) {
      this.righthandle.down = { x: event.x, y: event.y };
      this.righthandle.start.x = this.content.attributes.options.width;
      this.mouseisdown = true;
    },

    setHovered(value) {
      this.hovered = value;
    }
  }
}
