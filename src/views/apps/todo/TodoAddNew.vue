<!-- =========================================================================================
    File Name: TodoAddNew.vue
    Description: Add new todo component
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div >
    <vs-button @click="activePrompt = true" class="w-full" icon="add">Add Task</vs-button>
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
              <!-- <div v-if="!qrCodeActive">
                <vs-button
                  @click="generateQRCode()"
                  class="w-full"
                  >Generate QR Code</vs-button
                >
              </div>
              <div v-else class="my-5">
                <qr-code ref="qrCode" :text="qr_code"></qr-code>
              </div> -->
            </div>
          </div>
        </form>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
export default {
  props: {
    projectId: {
      required: true
    }
  },
  data () {
    return {
      qr_code: 'sdfsdf',
      qrCodeActive: false,
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
    generateQRCode () {
      this.qrCodeActive = true
      // LINK: http://domain.com/update-status/:id

    },
    addTodo () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const data = {
            task: this.taskLocal.task,
            description: this.taskLocal.description,
            status: 'Not Completed',
            project_id: this.projectId
          }
          this.$store.dispatch('todo/addTask', Object.assign({}, data))
            .then(() => {
              this.$vs.notify({
                title: 'Success',
                text: 'New task successfully added!',
                icon: 'check_box',
                color: 'success'
              })
            })
            .catch((error) => {
              console.log(error)
            })
          this.clearFields()
        }
      })
    }
  }
}
</script>
