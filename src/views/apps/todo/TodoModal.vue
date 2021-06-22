<template>
  <span>
    <vs-button
      @click="todoModalPrompt = !todoModalPrompt"
      icon-pack="feather"
      icon="icon-eye"
      color="primary"
      class="mr-2"
    />

    <vs-prompt
      :buttons-hidden="true"
      :title="task.task"
      @close="modalClosed"
      :active.sync="todoModalPrompt"
    >
      <div class="con-exemple-prompt">
        <small>Please scan below image before worker do their work</small>
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
            <img
              class="img-fluid"
              :src="task.qr_code"
              height="320"
              alt=""
            />
          </vs-col>
        </vs-row>
        <vs-row
          vs-align="flex-start"
          vs-type="flex"
          vs-justify="center"
          vs-w="12"
        >
          <vs-col vs-type="flex" vs-justify="center" vs-align="center">
            <vs-button
              @click="downloadImage()"
              icon-pack="feather"
              icon="icon-download"
              color="primary"
              class="mr-2"
              >Download This Image</vs-button
            >
          </vs-col>
        </vs-row>
      </div>
    </vs-prompt>
  </span>
</template>

<script>
export default {
  props: {
    taskId: {
      require: true
    }
  },
  data () {
    return {
      todoModalPrompt: false,
      task: this.$store.getters['todo/getTask'](this.taskId)
    }
  },
  methods: {
    acceptAlert () {},
    downloadImage () {
      const a = document.createElement('a')
      a.href = this.task.qr_code //Image Base64 Goes here
      a.download = `${this.task.task}_QRCode` //File name Here
      a.click()
      a.remove()

      this.$vs.notify({
        title: 'Image downloaded successfully',
        icon: 'check_box',
        color: 'success'
      })
    },
    fetchTask () {
      this.$store.dispatch('todo/fetchSingleTask', this.taskId)
    }
  },
  created () {
    this.fetchTask()
  }
}
</script>