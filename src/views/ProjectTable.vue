<template>
  <div>
    <vx-card title="Project">
      <!-- TABLE ACTION COL-2: ADD NEW USERS -->
      <template slot="actions">
        <project-add-new :customer="customers"/>
      </template>
      <vs-table max-items="10" pagination search stripe :data="projects">
        <template slot="thead">
          <vs-th sort-key="no">No</vs-th>
          <vs-th sort-key="project">Project</vs-th>
          <vs-th sort-key="description">Description</vs-th>
          <vs-th sort-key="customer">Customer</vs-th>
          <vs-th sort-key="action">Action</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].project">
              {{ indextr + 1 }}
            </vs-td>
            <vs-td :data="data[indextr].project">
              {{ data[indextr].project }}
            </vs-td>
            <vs-td :data="data[indextr].description">
              {{ data[indextr].description }}
            </vs-td>
            <vs-td :data="data[indextr].name">
              {{ data[indextr].name }}
            </vs-td>
            <vs-td>
              <project-edit :projectId="data[indextr].id"/>
              <project-delete :projectId="data[indextr].id"/>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
  </div>
</template>

<script>
import ProjectAddNew          from './ProjectAddNew.vue'
import ProjectEdit            from './ProjectEdit.vue'
import ProjectDelete           from './ProjectDelete.vue'

export default {
  name: 'users-table',
  data () {
    return {
      projects: [],
      customers: []
    }
  },
  components: {
    ProjectAddNew,
    ProjectEdit,
    ProjectDelete
  },
  methods: {
    fetchProjects () {
      this.$store.dispatch('project/fetchProjects')
        .then((response) => {
          this.projects = response.data
        })
    },
    fetchCustomer () {
      this.$store.dispatch('user/fetchUsers', 'customer')
        .then((response) => {
          console.log(response)
          this.customers = response.data
          console.log(this.customers)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  created () {
    this.fetchProjects()
    this.fetchCustomer()
  }
}
</script>

<style>
</style>