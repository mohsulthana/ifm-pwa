<template>
  <div>
    <vx-card title="Workers">
      <!-- TABLE ACTION COL-2: ADD NEW USERS -->
      <template slot="actions">
        <worker-add-new :service="serviceList" />
      </template>
      <vs-table max-items="10" pagination search stripe :data="users">
        <template slot="thead">
          <vs-th sort-key="no">No</vs-th>
          <vs-th sort-key="name">Name</vs-th>
          <vs-th sort-key="about">About</vs-th>
          <vs-th sort-key="email">Email</vs-th>
          <vs-th sort-key="action">Action</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].service">
              {{ indextr + 1 }}
            </vs-td>
            <vs-td :data="data[indextr].name">
              {{ data[indextr].name }}
            </vs-td>
            <vs-td :data="data[indextr].about">
              {{ data[indextr].about }}
            </vs-td>
            <vs-td :data="data[indextr].email">
              {{ data[indextr].email }}
            </vs-td>
            <vs-td>
              <worker-edit :adminId="data[indextr].worker_id" />
              <worker-delete :adminId="data[indextr].worker_id" />
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
  </div>
</template>

<script>
import WorkerAddNew from './WorkerAddNew.vue'
import WorkerEdit from './WorkerEdit.vue'
import WorkerDelete from './WorkerDelete.vue'

export default {
  name: 'worker-table',
  data () {
    return {
      users: [],
      services: []
    }
  },
  components: {
    WorkerAddNew,
    WorkerEdit,
    WorkerDelete
  },
  computed: {
    serviceList () {
      return this.$store.getters['service/fetchServices']
    }
  },
  methods: {
    fetchWorker () {
      this.$store.dispatch('user/fetchWorkers').then((response) => {
        this.users = response.data
      })
    },
    fetchService () {
      this.$store.dispatch('service/fetchServices')
    }
  },
  created () {
    this.fetchWorker()
    this.fetchService()
  }
}
</script>

<style>
</style>