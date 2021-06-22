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
      <vs-button color="primary" type="border" @click="$router.go(-1)" class="mb-5" icon="icon-chevron-left" icon-pack="feather">Back</vs-button>

    <vx-card :title="`${task.task}`">
      <template slot="actions">
        <cancel-task  v-if="task.status == 'On Progress' || task.status == 'Not Completed'" />
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
                  <span class="mr-2 text-danger" v-if="task.status == 'Not Completed'">{{ task.status }}</span>
                  <!-- <span>{{ item_data.brand }}</span> -->
                </p>
                <vs-divider />
                <h6>Description</h6>
                <p>{{ task.description }}</p>

                <!-- <vs-list class="product-sales-meta-list px-0 pt-4"> -->

                <!-- <div class="vx-row">
                  <div class="vx-col w-full">
                    <span class="text-xl font-medium">Color</span>
                    <div class="flex flex-wrap items-center mt-2">
                      <div
                        :class="{'border-transparent': opt_color != color}"
                        class="color-radio rounded-full mx-1 border-2 border-solid cursor-pointer relative"
                        :style="itemColor({color: color, style: ['borderColor']})"
                        v-for="color in available_item_colors"
                        :key="color"
                        @click="opt_color=color">
                          <div class="h-6 w-6 rounded-full absolute" :style="itemColor({color: color, style: ['backgroundColor']})"></div>
                        </div>
                    </div>
                  </div>
                </div> -->
              </div>
            </div>
          </div>

          <!-- Product Feature/Meta Row -->
          <!-- <div class="py-24 mb-16 mt-10 text-center item-features">
            <div class="vx-row">
              <div class="vx-col md:w-1/3 w-full">
                <div class="w-64 mx-auto mb-16 md:mb-0">
                  <feather-icon icon="AwardIcon" svgClasses="h-12 w-12 text-primary stroke-current" class="block mb-4" />
                  <span class="font-semibold text-lg">100% Original</span>
                  <p class="mt-2">Chocolate bar candy canes ice cream toffee cookie halvah.</p>
                </div>
              </div>
              <div class="vx-col md:w-1/3 w-full">
                <div class="w-64 mx-auto mb-16 md:mb-0">
                  <feather-icon icon="ClockIcon" svgClasses="h-12 w-12 text-primary stroke-current" class="block mb-4" />
                  <span class="font-semibold text-lg">10 Day Replacement</span>
                  <p class="mt-2">Marshmallow biscuit donut dragée fruitcake wafer.</p>
                </div>
              </div>
              <div class="vx-col md:w-1/3 w-full">
                <div class="w-64 mx-auto">
                  <feather-icon icon="ShieldIcon" svgClasses="h-12 w-12 text-primary stroke-current" class="block mb-4" />
                  <span class="font-semibold text-lg">1 Year Warranty</span>
                  <p class="mt-2">Cotton candy gingerbread cake I love sugar sweet.</p>
                </div>
              </div>
            </div>
          </div> -->
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
    task () {
      return this.$store.getters['todo/getSingleTask']
    }
  },
  mounted () {
    this.$store.dispatch('todo/fetchSingleTask', this.$route.params.id)
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
