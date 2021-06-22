<template>
  <div >
    <vs-button @click="activePrompt = true" class="w-full" icon="add"
      >Add Reasons</vs-button
    >
    <vs-prompt
      title="Add New Reason"
      accept-text="Add"
      button-cancel="border"
      @cancel="clearFields"
      @accept="registerUser"
      @close="clearFields"
      :is-valid="validateForm"
      :active.sync="activePrompt"
    >
      <div>
        <form>
          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-textarea name="reason" label="Add a reason to the list here" height="200px" v-model="reason" />
              <span>{{ errors.first("reason") }}</span>
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
      reason: '',
      activePrompt: false
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.reason !== ''
    }
  },
  methods: {
    clearFields () {
      Object.assign({}, {
        reason: ''
      })
    },
    registerUser () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const reason = {
            reason: this.reason,
            created_by: this.$store.state.AppActiveUser.name
          }
          this.$store
            .dispatch('reason/createReason', Object.assign({}, reason))
            .then(() => {
              this.$vs.notify({
                title: 'Success',
                text: 'Reason successfully created!',
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
