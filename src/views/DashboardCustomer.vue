<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="dashboard-analytics">
    <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">
        <vx-card title="Overview for Projects">
          <div class="mt-4">
            <vs-table v-model="selected" @selected="rowSelected" stripe :data="projects" class="table-dark-inverted">
              <template slot="thead">
                <vs-th>PROJECT ID.</vs-th>
                <vs-th>PROJECT NAME</vs-th>
                <vs-th>DESCRIPTION</vs-th>
                <vs-th>CUSTOMER</vs-th>
                <vs-th>RATING</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].orderNo">
                    <span>#{{data[indextr].id}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{data[indextr].project}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{data[indextr].description}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{data[indextr].name}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <star-rating read-only :show-rating="false" :rating="data[indextr].rate == null ? 0 : parseInt(data[indextr].rate)"/>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
export default {
  data () {
    return {
      projects: [],
      selected: []
    }
  },
  components: {
    StarRating
  },
  created () {
    this.fetchProjects()
  },
  methods: {
    rowSelected (tr) {
      const id = tr.id
      return this.$router.push({ name: 'project-report', params: { id }})
    },
    fetchProjects () {
      this.$store.dispatch('project/fetchProjectByCustomer', this.$store.state.AppActiveUser.id)
        .then((response) => {
          this.projects = response.data
        })
    }
  }
}
</script>

<style lang="scss">
/*! rtl:begin:ignore */
#dashboard-analytics {
  .greet-user{
    position: relative;

    .decore-left{
      position: absolute;
      left:0;
      top: 0;
    }
    .decore-right{
      position: absolute;
      right:0;
      top: 0;
    }
  }

  @media(max-width: 576px) {
    .decore-left, .decore-right{
      width: 140px;
    }
  }
}
/*! rtl:end:ignore */
</style>
