export default {
  template: `
    <div class="rect-controls">
      <span class="text">Border</span>
      <input :value="content.attributes.options.border"
        @change="updateBorder">
      <span class="text">Fill</span>
      <input :value="content.attributes.options.fill"
        @change="updateFill">
      <span class="text">Opacity</span>
      <input :value="content.attributes.options.opacity"
        @change="updateOpacity">
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
    updateBorder(event) {
      this.content.attributes.options.border = event.target.value;
    },
    updateFill(event) {
      this.content.attributes.options.fill = event.target.value;
    },
    updateOpacity(event) {
      this.content.attributes.options.opacity = event.target.value;
    }
  }
}
