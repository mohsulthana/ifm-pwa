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
      :disabled="task.status !== 'Not Completed'"
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
      color="#7367F0"
      gradient-color-secondary="#0158A3"
      title="Upload photo before work"
      accept-text="Update"
      cancel-text="Cancel"
      button-cancel="border"
      @accept="updateBeforeWork"
      :active.sync="activePrompt"
    >
      <div>
        <form>
          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-upload
                limit="1"
                @on-success="successUpload"
                @change="connvertImage"
                show-upload-button
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
  props: {
    task: {
      required: true
    }
  },
  data () {
    return {
      activePrompt: false,
      project: {
        id: this.task.id,
        before_work: '',
        status: 'On Progress'
      }
    }
  },
  methods: {
    updateBeforeWork () {
      this.$store.dispatch('todo/updatePhotoBeforeWork', this.project)
        .then(() => {
          this.$vs.notify({
            title: 'Success',
            text: 'Photo submitted!',
            icon: 'check_box',
            color: 'success'
          })
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
        self.project.before_work = event.target.result
      }
    }
  }
}
</script>
