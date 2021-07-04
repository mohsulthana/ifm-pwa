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
              <p>{{ detail.data.description }}</p>
            </div>
          </template>
        </vx-card>
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
        <vx-card title="Detail">
          <h6>Rating</h6>
          <small>Click on star to change rating</small>
          <star-rating
            @rating-selected="updateRating"
            :rating="detail.data.rate == null ? 0 : parseInt(detail.data.rate)"
          />
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
                  class="
                    inline-block
                    h-4
                    w-4
                    rounded-full
                    mr-2
                    bg-white
                    border-3 border-solid
                  "
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
import StarRating from 'vue-star-rating'

export default {
  data () {
    return {
      detail: []
    }
  },
  components: {
    StarRating
  },
  methods: {
    fetchProject () {
      const id = this.$route.params.id
      axios.get(`api/project/show/${id}`).then((response) => {
        this.detail = response.data
      })
    },
    updateRating (rating) {
      const payload = {
        id: this.$route.params.id,
        rating
      }
      this.$store
        .dispatch('project/updateRating', payload)
        .then((response) => {
          if (response.status === 200) {
            this.$vs.notify({
              title:'Successful',
              text: response.data.msg,
              color: 'success'
            })
          } else if (response.status === 201) {
            this.$vs.notify({
              title: 'Successful',
              text: response.data.msg,
              color: 'success'
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.fetchProject()
        })
    }
  },
  mounted () {
    this.fetchProject()
  }
}
</script>