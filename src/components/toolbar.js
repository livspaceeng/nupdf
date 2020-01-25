export default {
  template: `
    <div class="toolbar">
      <input
        style="display: none;"
        type="file" accept=".png,.jpg,.jpeg"
        ref="fileinput"
        @change="addImageToDocument()">
      <!-- <span class="text">Tool</span> -->
      <span class="fa fa-upload"
        @click="uploadImage"
      >
      </span>
      <span class="fa fa-hammer"
        @click="build"
      >
      </span>
      <span class="fa fa-plus"></span>
    </div>`,
  methods: {
    uploadImage() {
      this.$refs.fileinput.click();
    },
    addImageToDocument() {
      const file = this.$refs.fileinput.files[0];
      if (file) {
        console.log('Adding file: ', file);
        this.$emit('change', { type: 'image', data: file });
      }
    },
    build() {
      this.$root.$emit('change');
    }
  }
}
