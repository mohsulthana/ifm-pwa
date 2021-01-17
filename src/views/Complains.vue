<template>
  <div>
    <vx-card title="Complains">
      <!-- TABLE ACTION COL-2: ADD NEW USERS -->
      <vs-table max-items="10" pagination search stripe :data="complains">
        <template slot="thead">
          <vs-th sort-key="no">No</vs-th>
          <vs-th sort-key="project">Project</vs-th>
          <vs-th sort-key="description">Customer</vs-th>
          <vs-th sort-key="customer">Task</vs-th>
          <vs-th sort-key="action">Action</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <!-- {{data}} -->
            <vs-td :data="data[indextr].project">
              {{ indextr + 1 }}
            </vs-td>
            <vs-td :data="data[indextr].complain">
              {{ data[indextr].complain }}
            </vs-td>
            <vs-td :data="data[indextr].people">
              {{ data[indextr].people }}
            </vs-td>
            <vs-td :data="data[indextr].task_id">
              {{ data[indextr].task_id }}
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
      complains: []
    }
  },
  components: {
    ProjectAddNew,
    ProjectEdit,
    ProjectDelete
  },
  methods: {
    fetchComplain () {
      this.$store.dispatch('complain/fetchComplains')
        .then((response) => {
          this.complains = response.data
        })
    }
  },
  created () {
    this.fetchComplain()
  }
}
</script>

<style>
</style>