<template>
  <vx-card no-shadow title="List of reasons">

    <template slot="actions">
      <reason-add-new />
    </template>

      <vs-table max-items="10" pagination search stripe :data="reasons">
        <template slot="thead">
          <vs-th sort-key="no">No</vs-th>
          <vs-th sort-key="name">Reason</vs-th>
          <vs-th sort-key="about">Created By</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].service">
              {{ indextr + 1 }}
            </vs-td>
            <vs-td :data="data[indextr].name">
              {{ data[indextr].reason }}
            </vs-td>
            <vs-td :data="data[indextr].about">
              {{ data[indextr].created_by }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
  </vx-card>
</template>

<script>
import ReasonAddNew from './ReasonAddNew.vue'
export default {
  components: { ReasonAddNew },
  data () {
    return {
    }
  },
  methods: {
    fetchReasons () {
      this.$store.dispatch('reason/fetchReasons')
    }
  },
  mounted () {
    this.fetchReasons()
  },
  computed: {
    reasons () {
      return this.$store.getters['reason/getReasons']
    }
  }
}
</script>
