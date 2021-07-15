<template>
  <div>
    <vs-button
      type="border"
      color="warning"
      icon="flag"
      @click="activePrompt = true"
      >Cancel Task</vs-button
    >

    <vs-prompt
      class="mt-4 mr-2 shadow-lg"
      type="border"
      color="#7367F0"
      gradient-color-secondary="#0158A3"
      title="Task Cancellation"
      accept-text="Finish"
      cancel-text="Cancel"
      :is-valid="validateForm"
      @accept="submitReason"
      :active.sync="activePrompt"
    >
      <div>
        <form>
          <vs-select class="selectExample w-full" label="Your Reasons" v-model="reason">
            <vs-select-item :key="index" :value="item.reason" :text="item.reason" v-for="(item,index) in options" />
            <vs-select-item :key="0" value="Other" text="Other" />
          </vs-select>
        </form>
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  data () {
    return {
      reason: '',
      options: [],
      activePrompt: false
    }
  },
  methods: {
    fetchReasons () {
      axios.get('api/reason')
        .then((response) => {
          this.options = response.data
        })
    },
    submitReason () {
      console.log(this.reason)
      const data = {
        reason: this.reason
      }
      axios.put(`api/task/cancelTask/${this.$route.params.id}`, data)
        .then(() => {
          this.$vs.notify({
            title: 'Success',
            text: 'Task cancelled',
            icon: 'check_box',
            color: 'success'
          })
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.$nextTick()
            .then(() => {
              this.$store.dispatch('todo/fetchSingleTask', this.$route.params.id)
            })
        })
    }
  },
  mounted () {
    this.fetchReasons()
  }
}
</script>