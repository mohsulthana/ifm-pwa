<template>
  <div>
    <vs-button @click="activePrompt = true" icon-pack="feather" icon="icon-upload">PDF</vs-button>
    <vs-prompt
      title="Upload document"
      accept-text="Upload"
      button-cancel="border"
      :is-valid="validateForm"
      :active.sync="activePrompt"
    >
      <div>
        <form>
          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-upload limit="1" fileName="pdf" automatic show-upload-button :action="`${baseURL}/api/project/uploadPDF/${$route.params.id}`" @on-success="successUpload" />
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
      baseURL: process.env.VUE_APP_BASE_URL,
      activePrompt: false
    }
  },
  methods: {
    successUpload () {
      alert('Success')
    }
  }
}
</script>
