<template>
  <div >
    <vs-button @click="activePrompt = true" class="w-full" icon="add"
      >Add Complain</vs-button
    >
    <vs-prompt
      title="Add New Complain"
      accept-text="Add"
      button-cancel="border"
      @cancel="clearFields"
      @accept="addComplain"
      @close="clearFields"
      :is-valid="validateForm"
      :active.sync="activePrompt"
    >
      <div>
        <form>
          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-textarea
                v-validate="'required'"
                class="w-full mb-4 mt-5"
                label="Write your complain here"
                v-model="complain.complain"
                :color="validateForm ? 'success' : 'danger'"
              />
              <span>{{ errors.first("name") }}</span>
              <vs-select autocomplete v-model="complain.project" class="w-full mb-4 mt-5" label="Project">
                <vs-select-item
                  :value="item.id"
                  :text="item.project"
                  v-for="(item, index) in projects"
                  :key="index"
                />
              </vs-select>
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
      projects: [],
      complain: {
        complain: '',
        customer: this.$store.state.AppActiveUser.id,
        project: ''
      }
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.complain.complain !== ''
    }
  },
  mounted () {
    this.fetchProjects()
  },
  methods: {
    clearFields () {
      Object.assign(this.complain, {
        // complain: '',
        // customer: this.$store.state.AppActiveUser.id,
        // project: ''
      })
    },
    fetchProjects () {
      this.$store.dispatch('project/fetchProjectByCustomer', this.$store.state.AppActiveUser.id).then((response) => {
        this.projects = response.data
      })
    },
    addComplain () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store
            .dispatch('complain/addComplain', Object.assign({}, this.complain))
            .then(() => {
              this.$vs.notify({
                title: 'Success',
                text: 'Complain successfully created! This will be forwarded to Admin',
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
