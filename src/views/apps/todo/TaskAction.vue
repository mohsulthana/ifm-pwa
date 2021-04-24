<template>
  <div class="pb-2">
    <vs-button
      icon="settings"
      color="primary"
      class="cursor-pointer"
      svgClasses="w-5 h-5"
      @click="activePrompt = true"
      />

    <vs-prompt
      title="Update status"
      @cancel="val = ''"
      @accept="acceptAlert"
      @close="activePrompt = false"
      :active.sync="activePrompt"
    >
      <div class="con-exemple-prompt">
        <ul class="leftx">
          <li>
            <vs-radio color="success" v-model="taskLocal.status" vs-value="Done">Done</vs-radio>
          </li>
          <li>
            <vs-radio color="warning" v-model="taskLocal.status" vs-value="On Progress"
              >On Progress</vs-radio
            >
          </li>
          <li>
            <vs-radio color="danger" v-model="taskLocal.status" vs-value="Not Completed"
              >Not Completed</vs-radio
            >
          </li>
        </ul>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
export default {
  props: {
    taskLocal: {
      required: true
    }
  },
  data () {
    return {
      activePrompt: false
    }
  },
  methods: {
    openConfirm () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm',
        text: 'Are you sure to delete this task?',
        accept: this.acceptAlert,
        parameters: this.taskLocal
      })
    },
    acceptAlert (args) {
      const data = {
        id: args,
        status: args
      }
      console.log(args)
      // this.$store
      //   .dispatch('todo/deleteTask', args)
      //   .then((response) => {
      //     this.$vs.notify({
      //       title: 'Success',
      //       text: response.data.message,
      //       icon: 'check_box',
      //       color: 'success'
      //     })
      //   })
      //   .catch((error) => {
      //     this.$vs.notify({
      //       title: 'Error',
      //       text: error.data.message,
      //       icon: 'error',
      //       color: 'danger'
      //     })
      //   })
    }
  }
}
</script>
