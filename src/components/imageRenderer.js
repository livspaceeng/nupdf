export default {
  props: {
    content: {}
  },
  template: `
    <img :style="{
        border: 'solid 1px',
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
