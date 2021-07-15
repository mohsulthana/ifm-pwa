<template>
  <div>
    <vs-button @click="activePrompt = true" icon-pack="feather" icon="icon-upload">PDF</vs-button>
    <vs-prompt
      title="Upload document"
      button-cancel="false"
      color="primary"
      buttons-hidden="true"
      accept-text="Close"
      :active.sync="activePrompt"
    >
      <div>
        <form>
          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-upload automatic text="Only .pdf file allowed" accept=".pdf" limit="1" fileName="pdf" show-upload-button :action="`${baseURL}/api/project/uploadPDF/${$route.params.id}`" @on-success="successUpload" />
            </div>
          </div>
        </form>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
export default {
  data () {
    return {
      baseURL: 'https://api.ifmservice.de',
      activePrompt: false
    }
  },
  methods: {
    successUpload (args) {
      this.$store.dispatch('project/storePDF', args)
        .then(() => {
          this.$vs.notify({
            title: 'Success',
            text: 'Document uploaded succesfully',
            icon: 'check_box',
            color: 'success'
          })
        })
        .finally(() => {
          this.activePrompt = false
        })
    }
  }
}
</script>
