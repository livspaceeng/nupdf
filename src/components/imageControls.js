export default {
  template: `
    <div class="image-controls">
      <input type="number" :value="content.attributes.options.rotation"
        @change="updateRotation">
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
    updateRotation(event) {
      this.content.attributes.options.rotation = event.target.value;
    }
  }
}
