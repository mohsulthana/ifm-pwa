<template>
  <div>
    <vx-card title="Project">
      <!-- TABLE ACTION COL-2: ADD NEW USERS -->
      <template slot="actions">
        <project-add-new :customer="customers"/>
      </template>
      <!-- {{this.$store.state.AppActiveUser}} -->
      <vs-table max-items="10" pagination search stripe :data="projectList">
        <template slot="thead">
          <vs-th sort-key="no">No</vs-th>
          <vs-th sort-key="project">Project</vs-th>
          <vs-th sort-key="description">Description</vs-th>
          <vs-th sort-key="created">Created At</vs-th>
          <!-- <vs-th sort-key="action">Action</vs-th> -->
        </template>

        <template slot-scope="{ data }">
          <router-link :to="{path: '/project-detail/' + data[indextr].id}" :key="indextr" v-for="(tr, indextr) in data" tag="tr">
          <!-- <vs-tr :key="indextr" v-for="(tr, indextr) in data"> -->
            <vs-td :data="data[indextr].project">
              {{ indextr + 1 }}
            </vs-td>
            <vs-td :data="data[indextr].project">
              {{ data[indextr].project }}
            </vs-td>
            <vs-td :data="data[indextr].description">
              {{ data[indextr].description }}
            </vs-td>
            <vs-td :data="data[indextr].created_date">
              {{ data[indextr].created_date }}
            </vs-td>
            <!-- <vs-td>
              <project-edit :projectId="data[indextr].id"/>
              <project-delete :projectId="data[indextr].id"/>
            </vs-td> -->
          <!-- </vs-tr> -->
          </router-link>
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
  computed: {
    projectList () {
      return this.$store.getters['project/getProjects']
    }
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
          this.customers = response.data
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
tr:hover {
  background: #F8F8F8;
  cursor: pointer;
  color: #0158A3;
  transform: translateY(-4px);
}
</style>