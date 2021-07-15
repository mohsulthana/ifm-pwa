<!-- =========================================================================================
  File Name: ECommerceItemDetail.vue
  Description: eCommerce Item Detail page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="item-detail-page">
    <vs-button
      color="primary"
      type="border"
      @click="$router.push({path: `/task/${$route.query.projectId}`})"
      class="mb-5"
      icon="icon-chevron-left"
      icon-pack="feather"
      >Back</vs-button
    >

    <vx-card :title="`${task.task}`">
      <template slot="actions">
        <cancel-task
          v-if="task.status == 'On Progress' || task.status == 'Not Completed'"
        />
        <vs-button
          v-else
          type="flat"
          color="success"
          icon="icon-flag"
          icon-pack="feather"
          >{{ task.status }}</vs-button
        >
      </template>

      <template slot="no-body">
        <div class="item-content">
          <!-- Item Main Info -->
          <div class="product-details p-6">
            <div class="vx-row mt-6">
              <div
                class="vx-col md:w-2/5 w-full flex items-center justify-center"
              >
                <div class="product-img-container w-3/5 mx-auto mb-10 md:mb-0">
                  <span>Image Before Work</span>
                  <img
                    v-if="task.before_work === ''"
                    src="https://icon2.cleanpng.com/20180605/ijl/kisspng-computer-icons-image-file-formats-no-image-5b16ff0d2414b5.0787389815282337411478.jpg"
                    alt="Before work"
                    class="responsive"
                  />
                  <img
                    v-else
                    :src="task.before_work"
                    alt="Before work"
                    class="responsive"
                  />
                </div>
                <div class="product-img-container w-3/5 mx-auto mb-10 md:mb-0">
                  <span>Image After Work</span>
                  <img
                    v-if="task.after_work === ''"
                    src="https://icon2.cleanpng.com/20180605/ijl/kisspng-computer-icons-image-file-formats-no-image-5b16ff0d2414b5.0787389815282337411478.jpg"
                    alt="After work"
                    class="responsive"
                  />
                  <img
                    v-else
                    :src="task.after_work"
                    alt="After work"
                    class="responsive"
                  />
                </div>
              </div>

              <!-- Item Content -->
              <div class="vx-col md:w-3/5 w-full">
                <h3>{{ task.task }}</h3>

                <p class="my-2">
                  <span
                    class="mr-2 text-danger"
                    v-if="task.status == 'Not Completed'"
                    >{{ task.status }}</span
                  >
                  <!-- <span>{{ item_data.brand }}</span> -->
                </p>
                <vs-divider />
                <h6>Description</h6>
                <p>{{ task.description }}</p>
                <vs-button
                  :disabled="NotCompleted[2].status != 'Not Completed'"
                  color="primary"
                  type="line"
                  :key="nextTask.id"
                  @click="
                    $router.push({
                      name: 'task-detail', params: {id: NotCompleted[1].id }, query: {projectId: $route.query.projectId}})
                  "
                  class="mt-4 mr-2"
                  icon="icon-chevron-right"
                  icon-pack="feather"
                  >Next Task</vs-button
                >
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="flex justify-end flex-wrap">
        <task-before-work :task="task" />
        <task-after-work :task="task" />
      </div>
    </vx-card>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import StarRating from 'vue-star-rating'
import TaskBeforeWork from './TaskUpdateBeforeWork'
import TaskAfterWork from './TaskUpdateAfterWork'
import CancelTask from './CancelTask'

export default {
  components: {
    CancelTask,
    swiper,
    swiperSlide,
    StarRating,
    TaskBeforeWork,
    TaskAfterWork
  },
  data () {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    nextTask () {
      const filtered = this.allTasks.filter(
        (element) => element.status === 'Not Completed'
      )
      return filtered[1]
    },
    allTasks () {
      return this.$store.getters['todo/getTasks']
    },
    task () {
      return this.$store.getters['todo/getSingleTask']
    },
    taskList () {
      const list = this.$store.getters['todo/getTasks']
      return list.find((element) => element.status === 'Not Completed')
    },
    NotCompleted () {
      return this.allTasks.filter((element) => element.status === 'Not Completed')
    }
  },
  mounted () {
    this.$store.dispatch('todo/fetchSingleTask', this.$route.params.id)
  },
  watch: {
    $route (to, from) {
      if (to !== from) {
        location.reload()
      }
    }
  },
  methods: {
    // fetchAllTask () {
    //   const params = this.$route.query.projectId
    //   this.$store.dispatch('todo/fetchTaskForWorker', params)
    //     .then((response) => {
    //       this.allTasks = response.data
    //     })
    // }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/_variables.scss";

#item-detail-page {
  .color-radio {
    height: 2.28rem;
    width: 2.28rem;

    > div {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .item-features {
    background-color: #f7f7f7;

    .theme-dark & {
      background-color: $theme-dark-secondary-bg;
    }
  }

  .product-sales-meta-list {
    .vs-list--icon {
      padding-left: 0;
    }
  }

  .related-product-swiper {
    // padding-right: 2rem;
    // padding-left: 2rem;

    .swiper-wrapper {
      padding-bottom: 2rem;

      > .swiper-slide {
        background-color: #f7f7f7;
        box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.1),
          0 5px 12px 0 rgba(0, 0, 0, 0.08) !important;

        .theme-dark & {
          background-color: $theme-light-dark-bg;
        }
      }
    }

    .swiper-button-next,
    .swiper-button-prev {
      transform: scale(0.5);
      filter: hue-rotate(40deg);
    }

    .swiper-button-next {
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
    }
  }
}
</style>
