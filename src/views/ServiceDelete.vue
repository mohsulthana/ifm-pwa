<template>
  <span>
    <vs-button
      disabled
      @click="openConfirm()"
      type="border"
      color="danger"
      icon="icon-trash"
      icon-pack="feather"
      size="small"
      >Delete</vs-button
    >
  </span>
</template>

<script>
export default {
  props: {
    serviceId: {
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
        text: 'Are you sure to delete this service?',
        accept: this.acceptAlert,
        parameters: this.serviceId
      })
    },
    acceptAlert (args) {
      this.$store.dispatch('service/removeRecord', args)
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
