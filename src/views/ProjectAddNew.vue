<template>
  <div class="px-6 pb-2 pt-6">
    <vs-button @click="activePrompt = true" class="w-full" icon="book"
      >Add Project</vs-button
    >
    <vs-prompt
      title="Add New Project"
      accept-text="Add"
      button-cancel="border"
      @cancel="clearFields"
      @accept="createProject"
      :is-valid="validateForm"
      :active.sync="activePrompt"
    >
      <div>
        <form>
          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-input
                v-validate="'required'"
                name="project"
                class="w-full mb-4 mt-5"
                placeholder="Project Name"
                v-model="project.project"
                :color="validateForm ? 'success' : 'danger'"
              />
              <vs-textarea
                v-validate="'required'"
                name="description"
                class="w-full mb-4 mt-5"
                label="Project Description"
                v-model="project.description"
                :color="validateForm ? 'success' : 'danger'"
              />
              <vs-select
                class="w-full mb-4 mt-5"
                label="Customer"
                v-model="project.customer"
              >
                <vs-select-item
                  :key="index"
                  :value="item.user_id"
                  :text="item.name"
                  v-for="(item, index) in customer"
                />
              </vs-select>
              <vs-input-number label="Progress" max="100" class="w-full mb-4 mt-5" v-model="project.percent"/>
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
    customer: {
      type: Array
    }
  },
  data () {
    return {
      activePrompt: false,
      project: {
        project: '',
        description: '',
        customer: '',
        percent: 0,
        service_id: this.$store.state.AppActiveUser.service
      },
      users: []
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.project.project !== ''
    }
  },
  methods: {
    clearFields () {
      Object.assign(this.project, {
        project: '',
        description: '',
        customer: '',
        percent: 0,
        service_id: this.$store.state.AppActiveUser.service
      })
    },
    createProject () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          console.log(this.project)
          this.$store
            .dispatch('project/addProject', Object.assign({}, this.project))
            .then(() => {
              this.$vs.notify({
                title: 'Success',
                text: 'Project successfully created!',
                icon: 'check_box',
                color: 'success'
              })
            })
            .catch((error) => {
              this.$vs.notify({
                title: 'Error',
                text: error.data.message,
                icon: 'error',
                color: 'danger'
              })
            })
          this.clearFields()
        }
      })
    }
  }
}
</script>
