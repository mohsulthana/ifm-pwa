<template>
  <div>
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
        <vx-card class="overlay-card overflow-hidden w-full">
          <template slot="no-body">
            <img
              :src="detail.data.image"
              alt="user-profile-cover"
              class="responsive"
            />
            <div class="card-overlay text-white flex flex-col justify-between">
              <h4 class="text-white mb-4">{{ detail.data.project }}</h4>
              <p>{{detail.data.description}}</p>
            </div>
          </template>
        </vx-card>
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
        <vx-card title="Tasks">
          <ul>
            <li
              v-for="(value, index) in detail.task"
              :key="index"
              class="flex mb-3 justify-between"
            >
              <span class="flex items-center">
                <span
                  class="inline-block h-4 w-4 rounded-full mr-2 bg-white border-3 border-solid"
                  :class="border - primary"
                ></span>
                <span class="font-semibold">{{ value.task }}</span>
              </span>
              <span>{{ value.status }}</span>
            </li>
          </ul>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  data () {
    return {
      detail: []
    }
  },
  methods: {
    fetchProject () {
      const id = this.$route.params.id
      axios.get(`api/project/show/${id}`).then((response) => {
        this.detail = response.data
      })
    }
  },
  mounted () {
    this.fetchProject()
  }
}
</script>