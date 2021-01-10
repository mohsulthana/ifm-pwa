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
    <vx-card title="Task List" code-toggler>
      <br />

      <vs-table max-items="10" pagination stripe :data="taskLocal">
        <template slot="thead">
          <vs-th>Task</vs-th>
          <vs-th>Description</vs-th>
          <vs-th>Status</vs-th>
          <vs-th>Created at</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].task">
              {{ data[indextr].task }}
            </vs-td>
            <vs-td :data="data[indextr].description">
              {{ data[indextr].description }}
            </vs-td>
            <vs-td :data="data[indextr].id">
              {{ data[indextr].status == 1 ? 'Done' : 'On Progress' }}
            </vs-td>
            <vs-td :data="data[indextr].id">
              {{ data[indextr].created_date }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      title: '',
      taskLocal: []
    }
  },
  mounted () {
    this.$store.dispatch('todo/fetchTasks')
      .then((response) => {
        this.taskLocal = response.data
      })
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
