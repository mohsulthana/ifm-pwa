<template>
  <div>
    <vx-card title="Service">
      <!-- TABLE ACTION COL-2: ADD NEW USERS -->
      <template slot="actions">
        <service-add-new/>
      </template>
      <vs-table max-items="10" pagination search stripe :data="services">
        <template slot="thead">
          <vs-th sort-key="no">No</vs-th>
          <vs-th sort-key="service">Service</vs-th>
          <vs-th sort-key="description">Description</vs-th>
          <vs-th sort-key="action">Action</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].service">
              {{ indextr + 1 }}
            </vs-td>
            <vs-td :data="data[indextr].service">
              {{ data[indextr].service }}
            </vs-td>
            <vs-td :data="data[indextr].description">
              {{ data[indextr].description }}
            </vs-td>
            <vs-td>
              <project-delete :projectId="data[indextr].id"/>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
  </div>
</template>

<script>
import ServiceAddNew          from './ServiceAddNew.vue'
import ProjectEdit            from './ProjectEdit.vue'
import ProjectDelete           from './ProjectDelete.vue'

export default {
  name: 'users-table',
  data () {
    return {
      services: []
    }
  },
  components: {
    ServiceAddNew,
    ProjectEdit,
    ProjectDelete
  },
  methods: {
    fetchServices () {
      this.$store.dispatch('service/fetchServices', this.$store.state.AppActiveUser.id)
        .then((response) => {
          this.services = response.data.service
          console.log(response.data)
        })
    }
  },
  created () {
    this.fetchServices()
  }
}
</script>

<style>
</style>