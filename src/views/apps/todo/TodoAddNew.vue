<!-- =========================================================================================
    File Name: TodoAddNew.vue
    Description: Add new todo component
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="px-6 pb-2 pt-6">
    <vs-button @click="activePrompt = true" class="w-full">Add Task</vs-button>
    <vs-prompt
      title="Add Task"
      accept-text="Add Task"
      button-cancel="border"
      @cancel="clearFields"
      @accept="addTodo"
      @close="clearFields"
      :is-valid="validateForm"
      :active.sync="activePrompt"
    >
      <div>
        <form>
          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-input
                v-validate="'required'"
                name="title"
                class="w-full mb-4 mt-5"
                placeholder="Title"
                v-model="taskLocal.task"
                :color="validateForm ? 'success' : 'danger'"
              />
              <vs-textarea
                rows="5"
                label="Add description"
                v-model="taskLocal.description"
              />
              <vs-select
                multiple
                autocomplete
                class="w-full mb-4 mt-5"
                label="Worker"
                v-model="taskLocal.worker_id"
              >
                <vs-select-item
                  :value="item.worker_id"
                  :text="item.name"
                  v-for="(item, index) in worker"
                  :key="index"
                />
              </vs-select>
              <vs-upload limit="1" class="w-full mb-4 mt-5" action="https://jsonplaceholder.typicode.com/posts/" @on-success="successUpload" />
            </div>
          </div>
        </form>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activePrompt: false,
      status: [
        { text: 'Done', value: 'Done' },
        { text: 'On Progress', value: 'On Progress' },
        { text: 'Not Completed', value: 'Not Completed' }
      ],
      taskLocal: {
        task: '',
        description: '',
        status: 'Not Completed',
        worker_id: []
      },
      worker: []
    }
  },
  computed: {
    taskTags () {
      return this.$store.state.todo.taskTags
    },
    validateForm () {
      return !this.errors.any() && this.taskLocal.task !== ''
    }
  },
  methods: {
    clearFields () {
      Object.assign(this.taskLocal, {
        // task: '',
        // description: '',
        // status: ''
      })
    },
    addTodo () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const worker = this.taskLocal.worker_id
          for (let i = 0; i < worker.length; i++) {
            const element = worker[i]
            const data = {
              task: this.taskLocal.task,
              description: this.taskLocal.description,
              status: 'Not Completed',
              worker_id: element
            }
            this.$store.dispatch(
              'todo/addTask',
              Object.assign({}, data)
            )
          }
          this.clearFields()
        }
      })
    },
    fetchWorker () {
      this.$store.dispatch('user/fetchWorkers').then((response) => {
        this.worker = response.data
      })
    }
  },
  created () {
    this.fetchWorker()
  }
}
</script>
