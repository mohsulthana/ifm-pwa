<template>
  <div >
    <vs-button @click="activePrompt = true" class="w-full" icon="add"
      >Worker</vs-button
    >
    <vs-prompt
      title="Add New Worker"
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
                placeholder="Worker Name"
                v-model="user.name"
                :color="validateForm ? 'success' : 'danger'"
              />
              <span>{{ errors.first("name") }}</span>
              <vs-input
                v-validate="'required|email'"
                name="email"
                class="w-full mb-4 mt-5"
                placeholder="Mail"
                description-text="This one going to be used to login"
                v-model="user.email"
                :color="validateForm ? 'success' : 'danger'"
              />
              <span>{{ errors.first("email") }}</span>
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
              <span>{{ errors.first("password") }}</span>
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
    service: {
      type: Array
    }
  },
  data () {
    return {
      role: [
        {
          text: 'Worker', value: 'admin'
        }, {
          text: 'Customer', value: 'customer'
        }
      ],
      activePrompt: false,
      user: {
        name: '',
        email: '',
        password: '',
        about: 'Lorem ipsum de amat',
        photo: ''
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
        // name: '',
        // email: '',
        // password: '',
        // about: '',
        // photo: ''
      })
    },
    registerUser () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store
            .dispatch('user/createWorker', Object.assign({}, this.user))
            .then(() => {
              this.$vs.notify({
                title: 'Success',
                text: 'Worker successfully registered!',
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
