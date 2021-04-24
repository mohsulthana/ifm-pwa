<!-- =========================================================================================
    File Name: TodoEdit.vue
    Description: Edit todo component
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div>
    <vs-button
      :disabled="task.status === 'Done' || task.status === 'Not Completed'"
      class="mt-4 mr-2 shadow-lg"
      type="border"
      color="#7367F0"
      gradient-color-secondary="#0158A3"
      @click="activePrompt = true"
      >I'm done</vs-button
    >
    <vs-prompt
      class="mt-4 mr-2 shadow-lg"
      type="border"
      color="#7367F0"
      gradient-color-secondary="#0158A3"
      title="Upload photo after work"
      accept-text="Finish"
      cancel-text="Cancel"
      :is-valid="validateForm"
      @accept="updateAfterWork"
      :active.sync="activePrompt"
    >
      <div>
        <form>
          <small>Please scan below image after you did your work</small>
          <vs-row
            vs-align="flex-start"
            vs-type="flex"
            vs-justify="center"
            vs-w="12"
          >
            <vs-col
              vs-type="flex"
              vs-justify="center"
              vs-align="center"
              vs-w="2"
            >
              <img :key="task.id" :src="task.qr_code" :height="200" />
            </vs-col>
          </vs-row>
          <vs-divider class="m-1" />
          <vs-row
            vs-align="flex-center"
            vs-type="flex"
            vs-justify="center"
            vs-w="12"
          >
            <vs-col
              vs-type="flex"
              vs-justify="center"
              vs-align="center"
              vs-w="12"
            >
              <vs-upload
                limit="1"
                @on-success="successUpload"
                @change="connvertImage"
                show-upload-button
              />
            </vs-col>
            <vs-checkbox v-model="photoAfter"
              >I have scanned QR code above</vs-checkbox
            >
              <span>{{ errors.first('photoAfter') }}</span>
          </vs-row>
        </form>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      required: true
    }
  },
  data () {
    return {
      photoAfter: false,
      activePrompt: false,
      project: {
        id: this.task.id,
        after_work: '',
        status: 'Done'
      }
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.photoAfter === true
    }
  },
  methods: {
    updateAfterWork () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.dispatch('todo/updatePhotoAfterWork', this.project)
            .then(() => {
              this.$vs.notify({
                title: 'Success',
                text: 'Photo submitted!',
                icon: 'check_box',
                color: 'success'
              })
            })
        }
      })
    },
    successUpload () {
      alert('success')
    },
    connvertImage (event, target) {
      const self = this

      const reader = new FileReader()

      reader.readAsDataURL(target[0])
      reader.onload = function (event) {
        self.project.after_work = event.target.result
      }
    }
  }
}
</script>
