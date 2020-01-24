import Text from "./app.js";
export default {
  props: {
    contents: {}
  },
  data() {
    return {
      elements: {
        "text": Text
      }
    }
  },
  mounted() {
  },
  template: `
    <div class="page">
      <span v-for="element in page">
        <component :is="elements[element.type]"
          :content="element.children"
        >
        </component>
      </span>
    </div>
  `
}
