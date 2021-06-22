<template>
  <div>
    <vx-card title="Service">
      <!-- TABLE ACTION COL-2: ADD NEW USERS -->
      <template slot="actions">
        <service-add-new/>
      </template>
      <vs-table max-items="10" pagination search stripe :data="serviceList">
        <template slot="thead">
          <vs-th sort-key="no">No</vs-th>
          <vs-th sort-key="service">Service</vs-th>
          <vs-th sort-key="description">Description</vs-th>
          <vs-th sort-key="action">Action</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].service">
              {{ indextr + 1 }}
            </vs-td>
            <vs-td :data="data[indextr].service">
              {{ data[indextr].service }}
            </vs-td>
            <vs-td :data="data[indextr].description">
              {{ data[indextr].description }}
            </vs-td>
            <vs-td>
              <service-edit :serviceId="data[indextr]"/>
              <service-delete :serviceId="data[indextr].id"/>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
  </div>
</template>

<script>
import ServiceAddNew          from './ServiceAddNew.vue'
import ServiceEdit            from './ServiceEdit.vue'
import ServiceDelete           from './ServiceDelete.vue'

export default {
  name: 'users-table',
  data () {
    return {
      services: []
    }
  },
  components: {
    ServiceAddNew,
    ServiceEdit,
    ServiceDelete
  },
  computed: {
    serviceList () {
      return this.$store.getters['service/fetchServices']
    }
  },
  methods: {
    fetchServices () {
      this.$store.dispatch('service/fetchServices')
    }
  },
  created () {
    this.fetchServices()
  }
}
</script>

<style>
.includeIcon {
  display: inline-flex !important;
}
</style>