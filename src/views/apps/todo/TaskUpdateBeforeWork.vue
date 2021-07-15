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
      :disabled="task.status !== 'Not Completed' && task.status !== 'Cancelled'"
      class="mt-4 mr-2 shadow-lg"
      type="gradient"
      color="#7367F0"
      gradient-color-secondary="#0158A3"
      @click="activePrompt = true"
      >Let's start!</vs-button
    >
    <vs-prompt
      class="mt-4 mr-2 shadow-lg"
      type="border"
      gradient-color-secondary="#0158A3"
      title="Upload photo before work"
      accept-text="Start"
      cancel-text="Cancel"
      :is-valid="validateForm"
      @accept="updateBeforeWork"
      :active.sync="activePrompt"
    >
      <div>
        <form>
          <small>You need to scan this task QR Code to get the token. Please input your token to verify your work after you scan the QR Code</small>
    {{this.project.before_work }}

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
      wrongToken: false,
      photoBefore: false,
      activePrompt: false,
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
      isLoading: false,
      token: '',
      isTokenValid: false,
      project: {
        id: this.task.id,
        before_work: null,
        status: 'On Progress'
      }
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.project.before_work instanceof File && this.isTokenValid === true
    }
  },
  methods: {
    uploadDeleted () {
      this.project.before_work = ''
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
      this.project.before_work = target[0]
      console.log(this.project.before_work)
    },
    updateBeforeWork () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const id = this.$route.params.id

          const data = new FormData()
          data.append('id', id)
          data.append('before_work', this.project.before_work)
          data.append('status', 'On Progress')

          this.$store
            .dispatch('todo/updatePhotoBeforeWork', {data, id})
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
    toggleCamera () {
      if (this.isCameraOpen) {
        this.isCameraOpen = false
        this.isPhotoTaken = false
        this.isShotPhoto = false
        this.stopCameraStream()
      } else {
        this.isCameraOpen = true
        this.createCameraElement()
      }
    },
    createCameraElement () {
      this.isLoading = true

      const constraints = (window.constraints = {
        audio: false,
        video: true
      })

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.isLoading = false
          this.$refs.camera.srcObject = stream
        })
        .catch(() => {
          this.isLoading = false
          alert('May the browser didn\'t support or there is some errors.')
        })
    },

    stopCameraStream () {
      const tracks = this.$refs.camera.srcObject.getTracks()

      tracks.forEach((track) => {
        track.stop()
      })
    },

    takePhoto () {
      if (!this.isPhotoTaken) {
        this.isShotPhoto = true

        const FLASH_TIMEOUT = 50

        setTimeout(() => {
          this.isShotPhoto = false
        }, FLASH_TIMEOUT)
      }

      this.isPhotoTaken = !this.isPhotoTaken

      const context = this.$refs.canvas.getContext('2d')
      context.drawImage(this.$refs.camera, 0, 0, 450, 337.5)
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  display: flex;
  justify-content: center;
}

.web-camera-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 500px;

  .camera-button {
    margin-bottom: 2rem;
  }

  .camera-box {
    .camera-shutter {
      opacity: 0;
      width: 450px;
      height: 337.5px;
      background-color: #fff;
      position: absolute;

      &.flash {
        opacity: 1;
      }
    }
  }

  .camera-shoot {
    margin: 1rem 0;

    button {
      height: 60px;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;

      img {
        height: 35px;
        object-fit: cover;
      }
    }
  }

  .camera-loading {
    overflow: hidden;
    height: 100%;
    position: absolute;
    width: 100%;
    min-height: 150px;
    margin: 3rem 0 0 -1.2rem;

    ul {
      height: 100%;
      position: absolute;
      width: 100%;
      z-index: 999999;
      margin: 0;
    }

    .loader-circle {
      display: block;
      height: 14px;
      margin: 0 auto;
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
      transform: translateX(-50%);
      position: absolute;
      width: 100%;
      padding: 0;

      li {
        display: block;
        float: left;
        width: 10px;
        height: 10px;
        line-height: 10px;
        padding: 0;
        position: relative;
        margin: 0 0 0 4px;
        background: #999;
        animation: preload 1s infinite;
        top: -50%;
        border-radius: 100%;

        &:nth-child(2) {
          animation-delay: 0.2s;
        }

        &:nth-child(3) {
          animation-delay: 0.4s;
        }
      }
    }
  }

  @keyframes preload {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>