import TextBlock from "./textblock.js";

export default {
  components: {
    TextBlock
  },
  props: {
    page: {}
  },
  template: `
    <div class="page">
      <span v-for="element in page.children">
        <TextBlock v-if="element.type === 'text'" :content="element" />
      </span>
    </div>
  `
}
