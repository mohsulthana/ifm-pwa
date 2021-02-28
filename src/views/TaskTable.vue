<template>
  <div>
    <vx-card title="Tasks">
      <!-- TABLE ACTION COL-2: ADD NEW USERS -->
      <template slot="actions">
        <todo-add-new :customer="customers"/>
      </template>
      <!-- {{this.$store.state.AppActiveUser}} -->
      <vs-table max-items="10" pagination search stripe :data="taskList">
        <template slot="thead">
          <vs-th sort-key="no">No</vs-th>
          <vs-th sort-key="task">Task</vs-th>
          <vs-th sort-key="description">Description</vs-th>
          <vs-th sort-key="status">Status</vs-th>
          <vs-th sort-key="action">Action</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].id">
              {{ indextr + 1 }}
            </vs-td>
            <vs-td :data="data[indextr].task">
              {{ data[indextr].task }}
            </vs-td>
            <vs-td :data="data[indextr].description">
              {{ data[indextr].description }}
            </vs-td>
            <vs-td :data="data[indextr].status">
              {{ data[indextr].status }}
            </vs-td>
            <vs-td>
              <!-- <project-edit :projectId="data[indextr].id"/> -->
              <task-delete :taskId="data[indextr].id"/>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
  </div>
</template>

<script>
import TodoAddNew          from './apps/todo/TodoAddNew.vue'
import TaskEdit            from './apps/todo/TodoEdit.vue'
import TaskDelete           from './apps/todo/TodoDelete.vue'

export default {
  name: 'users-table',
  data () {
    return {
      tasks: [],
      customers: []
    }
  },
  components: {
    TodoAddNew,
    TaskEdit,
    TaskDelete
  },
  computed: {
    taskList () {
      return this.$store.getters['todo/getTasks']
    }
  },
  methods: {
    fetchTasks () {
      this.$store.dispatch('todo/fetchTasks')
        .then((response) => {
          this.tasks = response.data
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
    this.fetchTasks()
    this.fetchCustomer()
  }
}
</script>

<style>
</style>