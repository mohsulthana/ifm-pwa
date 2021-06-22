<template>
  <span >
    <vs-button
      disabled
      @click="activePrompt = true"
      type="border"
      icon="edit"
      color="primary"
      size="small"
      >Edit</vs-button
    >
    <vs-prompt
      title="Update Admin"
      accept-text="Update"
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
              <vs-input
                v-validate="'required'"
                name="name"
                class="w-full mb-4 mt-5"
                placeholder="User Name"
                v-model="user.name"
                :color="validateForm ? 'success' : 'danger'"
              />
              <span>{{ errors.first('name') }}</span>
             <vs-input
                v-validate="'required|email'"
                name="email"
                class="w-full mb-4 mt-5"
                placeholder="User mail"
                v-model="user.email"
                :color="validateForm ? 'success' : 'danger'"
              />
              <span>{{ errors.first('email') }}</span>
            </div>
          </div>
        </form>
      </div>
    </vs-prompt>
  </span>
</template>

<script>
export default {
  props: {
    adminId: {
      required: true
    }
  },
  data  () {
    return {
      activePrompt: false,
      user: Object.assign({}, this.$store.getters['user/getAdmin'](this.adminId))
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
      //   role: 'admin'
      // })
    },
    registerUser () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store
            .dispatch('user/register', Object.assign({}, this.user))
            .then(() => {
              this.$vs.notify({
                title: 'Success',
                text: 'Admin successfully registered!',
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
