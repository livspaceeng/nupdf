export default {
  name: 'editor-background',
  template: `
    <div class="graybackground">
      <slot name="toolbar"></slot>
      <slot></slot>
    </div>
  `
}
