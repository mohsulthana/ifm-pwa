<template>
  <div class="px-3 pb-2">
    <vs-button
      icon="delete"
      color="danger"
      type="border"
      class="cursor-pointer"
      svgClasses="w-5 h-5"
      @click="openConfirm"
    >Delete</vs-button>
  </div>
</template>

<script>
export default {
  props: {
    taskId: {
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    openConfirm () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm',
        text: 'Are you sure to delete this task?',
        accept: this.acceptAlert,
        parameters: this.taskId
      })
    },
    acceptAlert (args) {
      this.$store
        .dispatch('todo/deleteTask', args)
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
    }
  }
}
</script>
