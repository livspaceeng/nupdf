export default {
  props: {
    content: {}
  },
  template: `
    <div :style="{
        border: 'solid 1px',
        position: 'absolute',
        left: content.attributes.x,
        top: content.attributes.y,
        width: content.attributes.width,
        height: content.attributes.height
      }"
    >
    </div>
  `
}