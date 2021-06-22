<template>
  <div >
    <vs-button @click="activePrompt = true" class="w-full" icon="add"
      >Add Service</vs-button
    >
    <vs-prompt
      title="Add New Service"
      accept-text="Add"
      button-cancel="border"
      @cancel="clearFields"
      @accept="addNewService"
      :is-valid="validateForm"
      :active.sync="activePrompt"
    >
      <div>
        <form>
          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-input
                v-validate="'required'"
                name="service"
                class="w-full mb-4 mt-5"
                placeholder="Service Name"
                v-model="service.service"
                :color="validateForm ? 'success' : 'danger'"
              />
              <vs-textarea
                v-validate="'required'"
                name="description"
                class="w-full mb-4 mt-5"
                label="Service Description"
                v-model="service.description"
                :color="validateForm ? 'success' : 'danger'"
              />
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
      service: {
        service: '',
        description: ''
      },
      users: []
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.service.service !== ''
    }
  },
  methods: {
    clearFields () {
      Object.assign(this.service, {
        service: '',
        description: ''
      })
    },
    addNewService () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store
            .dispatch('service/addService', Object.assign({}, this.service))
            .then(() => {
              this.$vs.notify({
                title: 'Success',
                text: 'Service successfully created!',
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
