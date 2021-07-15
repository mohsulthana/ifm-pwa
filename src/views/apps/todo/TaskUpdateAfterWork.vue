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
          <small>You need to scan this task QR Code to get the token. Please input your token to verify your work after you scan the QR Code</small>
          <vs-row
            vs-align="flex-start"
            vs-type="flex"
            vs-justify="center"
            vs-w="12"
          >
            <!-- <div v-if="isCameraOpen && !isLoading" class="camera-shoot">
              <vs-button
                @click="takePhoto"
                icon-pack="feather"
                icon="icon-camera"
              >
              </vs-button>
            </div> -->
            <!-- <vs-col
              vs-type="flex"
              vs-justify="center"
              vs-align="center"
              vs-w="12"
            >
              <div v-show="isCameraOpen && isLoading" class="camera-loading">
                <ul class="loader-circle">
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>

              <div
                v-if="isCameraOpen"
                v-show="!isLoading"
                class="camera-box"
                :class="{ flash: isShotPhoto }"
              >
                <div
                  class="camera-shutter"
                  :class="{ flash: isShotPhoto }"
                ></div>

                <video
                  v-show="!isPhotoTaken"
                  ref="camera"
                  width="'auto'"
                  :height="300.5"
                  autoplay
                ></video>

                <canvas
                  v-show="isPhotoTaken"
                  id="photoTaken"
                  ref="canvas"
                  :width="300"
                  :height="300.5"
                ></canvas>
              </div>
            </vs-col> -->
            <vs-col
              vs-type="flex"
              vs-justify="center"
              vs-align="center"
              vs-w="12"
            >
              <vs-input
                v-validate="'required'"
                name="token"
                :danger="wrongToken"
                class="w-full my-4"
                placeholder="Token code"
                v-model="token"
                :color="validateForm ? 'success' : 'danger'"
              />
              <vs-button
                @click="verifyToken()"
                icon-pack="feather"
                icon="icon-check"
                color="primary"
                class="my-4"
                :class="{ wrongToken: 'mb-5'}"
              >Verify</vs-button>
            </vs-col>
          </vs-row>

          <div v-if="wrongToken" class="text-left text-danger">Invalid token</div>
          <div v-if="isTokenValid" class="text-success">Token is valid</div>

          <vs-row
            v-if="isTokenValid"
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
                @on-delete="uploadDeleted"
                @on-success="successUpload"
                @change="convertImage"
                show-upload-button
              />
            </vs-col>
            <small>Upload your work with button above</small>
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
      wrongToken: false,
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
      isLoading: false,
      token: '',
      isTokenValid: false,
      project: {
        id: this.task.id,
        after_work: '',
        status: 'Done'
      }
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.project.after_work instanceof File && this.isTokenValid === true
    }
  },
  methods: {
    updateAfterWork () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const id = this.$route.params.id

          const data = new FormData()
          data.append('id', id)
          data.append('after_work', this.project.after_work)
          data.append('status', 'Done')

          this.$store.dispatch('todo/updatePhotoAfterWork', {data, id})
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
    uploadDeleted () {
      this.project.after_work = ''
    },
    verifyToken () {
      const token = { token: this.token, id: this.task.id }
      this.$store.dispatch('todo/verifyToken', Object.assign({}, token))
        .then(() => {
          this.isTokenValid = true
          this.wrongToken = false
        })
        .catch(() => {
          this.wrongToken = true
          this.isTokenValid = false
        })
    },
    convertImage (event, target) {
      this.project.after_work = target[0]
    }
  }
}
</script>
