<template>
  <div class="px-6 pb-2 pt-6">
    <vs-button
      @click="openConfirm()"
      type="border"
      color="danger"
      icon="delete"
      size="small"
      >Delete</vs-button
    >
  </div>
</template>

<script>
export default {
  props: {
    projectId: {
      required: true
    }
  },
  data  () {
    return {}
  },
  methods: {
    openConfirm () {
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: 'Confirm',
        text: 'Are you sure to delete this project?',
        accept: this.acceptAlert,
        parameters: this.projectId
      })
    },
    acceptAlert (args) {
      this.$store.dispatch('project/removeRecord', args)
        .then((response) => {
          this.$vs.notify({
            title: 'Success',
            text: response.data.message,
            icon: 'check_box',
            color: 'success'
          })
          this.$router.push('/projects')
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
