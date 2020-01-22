export default {
  data() {
    return {
      rows: []
    }
  },
  mounted() {
    this.rows = new Array(50).fill(0).map((item, i) => i);
  },
  template: `
    <div class="pages">
      <div class="page">
      </div>
    </div>
  `
}
