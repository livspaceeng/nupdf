import Page from "./page.js";

export default {
  components: {
    Page
  },
  props: {
    pages: {}
  },
  data() {
    return {}
  },
  mounted() {
  },
  template: `
    <div class="pages">
      <Page
        class="page"
        v-for="(page, i) in pages"
        :key="i"
        :page="page"
      >
      </Page>
    </div>
  `
}
