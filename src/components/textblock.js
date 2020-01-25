export default {
  props: {
    content: {}
  },
  template: `
    <div
      class="textblock"
      :style="{
        border: 'solid 1px',
        position: 'absolute',
        left: content.attributes.x,
        top: content.attributes.y,
        width: content.attributes.options.width
      }"
    >
      {{ content.attributes.value }}
    </div>
  `
}
