<template>
  <div class="px-6 pb-2 pt-6">
    <vs-button
      @click="activePrompt = true"
      type="border"
      icon="edit"
      color="primary"
      size="small"
      >Edit</vs-button
    >
    <vs-prompt
      :title="`Update project ${project.project}`"
      accept-text="Update"
      button-cancel="border"
      @cancel="clearFields"
      @accept="updateProject"
      @close="clearFields"
      :active.sync="activePrompt"
    >
      <div>
        <form>
          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-input
                v-validate="'required'"
                name="name"
                v-model="project.project"
                class="w-full mb-4 mt-5"
                placeholder="Project name"
                :color="validateForm ? 'success' : 'danger'"
              />
              <span>{{ errors.first('name') }}</span>
             <vs-input
                v-validate="'required'"
                name="description"
                v-model="project.description"
                class="w-full mb-4 mt-5"
                placeholder="Project Description"
                :color="validateForm ? 'success' : 'danger'"
              />
              <span>{{ errors.first('email') }}</span>
               <!-- <vs-select
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
              </vs-select> -->
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
  data  () {
    return {
      activePrompt: false,
      project: Object.assign({}, this.$store.getters['project/getProject'](7))
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any()
    }
  },
  methods: {
    clearFields () {
      // Object.assign(this.user, {
      //   name: '',
      //   email: '',
      //   password: '',
      //   role: 'admin
      // })
    },
    updateProject () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const data = {
            id: this.projectId,
            project: this.project.project,
            description: this.project.description
          }
          this.$store
            .dispatch('project/updateProject', Object.assign({}, data))
            .then(() => {
              this.$vs.notify({
                title: 'Success',
                text: 'Project successfully updated!',
                icon: 'check_box',
                color: 'success'
              })
            })
            .catch((error) => {
              console.log(error)
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
