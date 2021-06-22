<!-- =========================================================================================
    File Name: DashboardEcommerce.vue
    Description: Dashboard - Ecommerce
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <div>
        <div class="vx-row">
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
                <statistics-card-line
                  v-if="subscribersGained.analyticsData"
                  icon="UserIcon"
                  :statistic="totalUser | k_formatter"
                  statisticTitle="Kunde"
                  :chartData="subscribersGained.series"
                  type="area" />
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
                <statistics-card-line
                  v-if="revenueGenerated.analyticsData"
                  icon="BriefcaseIcon"
                  :statistic="totalTask | k_formatter"
                  statisticTitle="Tasks"
                  :chartData="revenueGenerated.series"
                  color="success"
                  type="area" />
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
                <statistics-card-line
                  v-if="quarterlySales.analyticsData"
                  icon="ToolIcon"
                  :statistic="totalWorker | k_formatter"
                  statisticTitle="Fachkraft"
                  :chartData="quarterlySales.series"
                  color="danger"
                  type="area" />
            </div>
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
                <statistics-card-line
                  v-if="ordersRecevied.analyticsData"
                  icon="AlertTriangleIcon"
                  :statistic="totalComplain | k_formatter"
                  statisticTitle="Complaints"
                  :chartData="ordersRecevied.series"
                  color="warning"
                  type="area" />
            </div>
        </div>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import analyticsData from './ui-elements/card/analyticsData.js'
import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'
import axios from  'axios'

export default{
  components: {
    VueApexCharts,
    StatisticsCardLine,
    VuePerfectScrollbar,
    ChangeTimeDurationDropdown
  },
  data () {
    return {
      subscribersGained: {},
      revenueGenerated: {},
      quarterlySales: {},
      ordersRecevied: {},

      revenueComparisonLine: {},
      goalOverview: {},

      browserStatistics: [],
      clientRetentionBar: {},

      sessionsData: {},
      chatLog: [],
      chatMsgInput: '',
      customersData: {},

      analyticsData,
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      },
      totalUser: '',
      totalTask: '',
      totalComplain: '',
      totalWorker: ''
    }
  },
  methods: {
    fetchDatas () {
      //   Fetch user, project, complain
      const baseURL = process.env.VUE_APP_BASE_URL

      axios.all([axios.get(`${baseURL}/api/users`),  axios.get(`${baseURL}/api/task/getAllTasks`), axios.get(`${baseURL}/api/complain`), axios.get(`${baseURL}/api/worker`)]).then(axios.spread((...responses) => {
        this.totalUser = responses[0].data.length
        this.totalTask = responses[1].data.length
        this.totalComplain = responses[2].data.length
        this.totalWorker = responses[3].data.length
        // use/access the results
      })).catch(errors => {
        console.error(errors)
      })
    }
  },
  computed: {
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  mounted () {
    const scroll_el = this.$refs.chatLogPS.$el || this.$refs.chatLogPS
    scroll_el.scrollTop = this.$refs.chatLog.scrollHeight
  },
  created () {
    this.fetchDatas()
    // Subscribers gained - Statistics
    this.$http.get('/api/card/card-statistics/subscribers')
      .then((response) => { this.subscribersGained = response.data })
      .catch((error) => { console.log(error) })

      // Revenue Generated
    this.$http.get('/api/card/card-statistics/revenue')
      .then((response) => { this.revenueGenerated = response.data })
      .catch((error) => { console.log(error) })

      // Sales
    this.$http.get('/api/card/card-statistics/sales')
      .then((response) => { this.quarterlySales = response.data })
      .catch((error) => { console.log(error) })

      // Orders - Statistics
    this.$http.get('/api/card/card-statistics/orders')
      .then((response) => { this.ordersRecevied = response.data })
      .catch((error) => { console.log(error) })

      // Revenue Comparison
    this.$http.get('/api/card/card-analytics/revenue-comparison')
      .then((response) => { this.revenueComparisonLine = response.data })
      .catch((error) => { console.log(error) })

      // Goal Overview
    this.$http.get('/api/card/card-analytics/goal-overview')
      .then((response) => { this.goalOverview = response.data })
      .catch((error) => { console.log(error) })

      // Browser Analytics
    this.$http.get('/api/card/card-analytics/browser-analytics')
      .then((response) => { this.browserStatistics = response.data })
      .catch((error) => { console.log(error) })

      // Client Retention
    this.$http.get('/api/card/card-analytics/client-retention')
      .then((response) => { this.clientRetentionBar = response.data })
      .catch((error) => { console.log(error) })

      // Sessions By Device
    this.$http.get('/api/card/card-analytics/session-by-device')
      .then((response) => { this.sessionsData = response.data })
      .catch((error) => { console.log(error) })

      // Chat Log
    this.$http.get('/api/chat/demo-1/log')
      .then((response) => { this.chatLog = response.data })
      .catch((error) => { console.log(error) })

      // Customers
    this.$http.get('/api/card/card-analytics/customers')
      .then((response) => { this.customersData = response.data })
      .catch((error) => { console.log(error) })
  }
}
</script>

<style lang="scss">
.chat-card-log {
    height: 400px;

    .chat-sent-msg {
        background-color: #f2f4f7 !important;
    }
}
</style>
