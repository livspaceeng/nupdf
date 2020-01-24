export default {
  props: {
    doctree: {}
  },
  data() {
    return {}
  },
  mounted() {
  },
  template: `
    <div class="pages">
      <Page class="page" v-for="page in doctree.children"
        :contents="page"
      >
      </Page>
    </div>
  `
}
