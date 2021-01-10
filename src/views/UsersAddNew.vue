<template>
  <div class="px-6 pb-2 pt-6">
    <vs-button @click="activePrompt = true" class="w-full" icon="person"
      >Add User</vs-button
    >
    <vs-prompt
      title="Add New User"
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
              <vs-input
                v-validate="'required|min:6'"
                type="password"
                ref="password"
                name="password"
                class="w-full mb-4 mt-5"
                placeholder="Password"
                v-model="user.password"
                :color="validateForm ? 'success' : 'danger'"
              />
              <span>{{ errors.first('password') }}</span>
              <!-- <vs-input
                v-validate="'required'"
                type="password"
                data-vv-as="password"
                name="password_confirmation"
                class="w-full mb-4 mt-5"
                placeholder="Password Confirmation"
                :color="validateForm ? 'success' : 'danger'"
              />
              <span>{{ errors.first('password_confirmation') }}</span> -->
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
      user: {
        name: '',
        email: '',
        password: '',
        role: 'customer'
      }
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.user.name !== ''
    }
  },
  methods: {
    clearFields () {
      Object.assign(this.user, {
        name: '',
        email: '',
        password: '',
        role: 'customer'
      })
    },
    registerUser () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.dispatch('user/register', Object.assign({}, this.user))
            .then((response) => {
              this.$vs.notify({
                title: 'Success',
                text: response.data.message,
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
