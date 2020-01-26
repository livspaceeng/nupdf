export default {
  template: `
    <div class="text-controls">
      <select @change="updateFont">
        <option value="Helvetica">Helvetica</option>
        <option value="Courier">Courier</option>
        <option value="/Gilroy-ExtraBold.otf">GilroyExtraBold</option>
        <option value="/Gilroy-Light.otf">GilroyLight</option>
      </select>
      <input type="number" :value="content.attributes.fontSize"
        @change="updateFontSize">
      <span class="fa fa-times" @click="close"></span>
    </div>
  `,
  props: {
    content: {}
  },
  methods: {
    close() {
      this.$emit('close');
    },
    updateFont(event) {
      this.content.attributes.font = event.target.value;
    },
    updateFontSize(event) {
      this.content.attributes.fontSize = event.target.value;
    }
  }
}
