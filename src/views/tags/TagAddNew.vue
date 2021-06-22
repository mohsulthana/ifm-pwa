<template>
  <div class="">
    <vs-button @click="activePrompt = true" class="w-full" icon="add"
      >Add Tag</vs-button
    >
    <vs-prompt
      title="Add New Tag"
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
                name="tag"
                class="w-full mb-4 mt-5"
                placeholder="Tag name"
                v-model="name"
                :color="validateForm ? 'success' : 'danger'"
              />
              <span>{{ errors.first("tag") }}</span>
              <verte v-model="color" :model="'hex'" display="widget"></verte>
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
      color: '',
      name: '',
      activePrompt: false
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.name !== ''
    }
  },
  methods: {
    clearFields () {
      Object.assign({}, {
        tag_color: '',
        tag_name: ''
      })
    },
    registerUser () {
      const tag = {
        tag_color: this.color,
        tag_name: this.name
      }

      this.$store
        .dispatch('tag/createTag', Object.assign({}, tag))
        .then(() => {
          this.$vs.notify({
            title: 'Success',
            text: 'Tag successfully created!',
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
  }
}
</script>
