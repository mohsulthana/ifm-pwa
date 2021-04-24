<template>
  <div>
    <vx-card title="Complains">
      <!-- TABLE ACTION COL-2: ADD NEW USERS -->
      <template slot="actions">
        <complain-add-new/>
      </template>
            <vs-table max-items="10" pagination search stripe :data="complains">
        <template slot="thead">
          <vs-th sort-key="no">No</vs-th>
          <vs-th sort-key="complain">Complain</vs-th>
          <vs-th sort-key="description">Customer</vs-th>
          <vs-th sort-key="project">Project</vs-th>
          <vs-th sort-key="action">Action</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <!-- {{data}} -->
            <vs-td :data="data[indextr].id">
              {{ indextr + 1 }}
            </vs-td>
            <vs-td :data="data[indextr].complain">
              {{ data[indextr].complain }}
            </vs-td>
            <vs-td :data="data[indextr].name">
              {{ data[indextr].name }}
            </vs-td>
            <vs-td :data="data[indextr].project">
              {{ data[indextr].project }}
            </vs-td>
            <vs-td>
              <complain-delete :complainId="data[indextr].id"/>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
  </div>
</template>

<script>
import ComplainAddNew          from './ComplainAddNew.vue'
import ComplainDelete           from './ComplainDelete.vue'

export default {
  name: 'users-table',
  data () {
    return {
      complains: []
    }
  },
  computed: {
    complainList () {
      return this.$store.getters['complain/getComplains']
    }
  },
  components: {
    ComplainAddNew,
    ComplainDelete
  },
  methods: {
    fetchComplain () {
      this.$store.dispatch('complain/fetchComplainsByUser', this.$store.state.AppActiveUser.id)
        .then((response) => {
          this.complains = response.data
        })
    }
  },
  mounted () {
    this.fetchComplain()
  }
}
</script>

<style>
</style>