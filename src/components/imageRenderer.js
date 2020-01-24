export default {
  props: {
    content: {}
  },
  template: `
    <img class="hoverborder"
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
