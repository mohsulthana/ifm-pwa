<template>
  <div>
    <vx-card title="Users">
      <!-- TABLE ACTION COL-2: ADD NEW USERS -->
      <template slot="actions">
        <admin-add-new :service="services"/>
      </template>
      <vs-table max-items="10" pagination search stripe :data="users">
        <template slot="thead">
          <vs-th sort-key="name">Name</vs-th>
          <vs-th sort-key="role">Role</vs-th>
          <vs-th sort-key="email">Email</vs-th>
          <vs-th sort-key="action">Action</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].name">
              {{ data[indextr].name }}
            </vs-td>
            <vs-td :data="data[indextr].role">
              {{ data[indextr].role }}
            </vs-td>
            <vs-td :data="data[indextr].email">
              {{ data[indextr].email }}
            </vs-td>
            <vs-td>
              <admin-edit :adminId="data[indextr].id"/>
              <admin-delete :adminId="data[indextr].id"/>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
  </div>
</template>

<script>
import AdminAddNew          from './AdminAddNew.vue'
import AdminEdit            from './AdminEdit.vue'
import AdminDelete           from './AdminDelete.vue'

export default {
  name: 'users-table',
  data () {
    return {
      users: [],
      services: []
    }
  },
  components: {
    AdminAddNew,
    AdminEdit,
    AdminDelete
  },
  methods: {
    fetchUsers () {
      this.$store.dispatch('user/fetchAdmin')
        .then((response) => {
          this.users = response.data
          console.log(response.data)
        })
    },
    fetchService () {
      this.$store.dispatch('service/fetchServices')
        .then((response) => {
          this.services = response.data.service
        })
    }
  },
  created () {
    this.fetchUsers()
    this.fetchService()
  }
}
</script>

<style>
</style>