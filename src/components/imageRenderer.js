export default {
  props: {
    content: {}
  },
  data: () => ({
    mouseisdown: false,
    down: {
      x: 0,
      y: 0
    },
    up: {
      x: 0,
      y: 0
    },
    start: {
      x: 0,
      y: 0
    }
  }),
  methods: {
    mousedown(event) {
      this.down = {x: event.x, y: event.y};
      this.mouseisdown = true;
      this.start.x = this.content.attributes.x;
      this.start.y = this.content.attributes.y;
    },
    mouseup(event) {
      this.mouseisdown = false;
      this.$root.$emit('change');
    },
    move() {
      if (this.mouseisdown) {
        this.up = {x: event.x, y: event.y};
        const dx = this.up.x - this.down.x;
        const dy = this.up.y - this.down.y;
        this.content.attributes.x = this.start.x + dx;
        this.content.attributes.y = this.start.y + dy;
        // console.log(dx, dy);
      }
    }
  },
  template: `
    <img class="hoverborder"
      @mousedown="mousedown"
      @mouseup="mouseup"
      @mousemove="move"
      draggable="false"
      :style="{
        position: 'absolute',
        left: content.attributes.x,
        top: content.attributes.y,
        width: content.attributes.options.width
      }"
      :src="content.attributes.url"
    >
    </img>
  `
}
