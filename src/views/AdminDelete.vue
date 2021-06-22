<template>
  <span >
    <vs-button
      @click="openConfirm()"
      type="border"
      color="danger"
      icon-pack="feather"
      icon="icon-trash"
      size="small"
      >Delete</vs-button
    >
  </span>
</template>

<script>
export default {
  props: {
    adminId: {
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
        text: 'Are you sure to delete this user?',
        accept: this.acceptAlert,
        parameters: this.adminId
      })
    },
    acceptAlert (args) {
      this.$store.dispatch('user/removeRecord', args)
        .then((response) => {
          this.$vs.notify({
            title: 'Success',
            text: response.data.message,
            icon: 'check_box',
            color: 'success'
          })
        })
        .catch((error) => {
          console.log(error)
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
