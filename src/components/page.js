import TextBlock from "./textblock.js";
import ImageRenderer from "./imageRenderer.js";
import Rectangle from "./rectangle.js";

export default {
  components: {
    TextBlock,
    ImageRenderer,
    Rectangle,
  },
  props: {
    page: {}
  },
  template: `
    <div class="page">
      <span v-for="element in page.children">
        <TextBlock v-if="element.type === 'text'" :content="element" />
        <ImageRenderer v-if="element.type === 'image'" :content="element"/>
        <Rectangle v-if="element.type === 'rect'" :content="element"/>
      </span>
    </div>
  `
}
