<template>
  <div>
    <vx-card title="Users">
      <!-- TABLE ACTION COL-2: ADD NEW USERS -->
      <template slot="actions">
        <users-add-new/>
      </template>
      <vs-table max-items="10" pagination search stripe :data="listUsers">
        <template slot="thead">
          <vs-th sort-key="no">No</vs-th>
          <vs-th sort-key="name">Name</vs-th>
          <vs-th sort-key="role">Role</vs-th>
          <vs-th sort-key="email">Email</vs-th>
          <vs-th sort-key="action">Action</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="indextr + 1">
              {{ indextr + 1 }}
            </vs-td>
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
              <admin-edit :adminId="data[indextr].user_id"/>
              <admin-delete :adminId="data[indextr].user_id"/>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
  </div>
</template>

<script>
import UsersAddNew          from './UsersAddNew.vue'
import AdminEdit            from './AdminEdit.vue'
import AdminDelete           from './AdminDelete.vue'

export default {
  name: 'users-table',
  data () {
    return {
      users: []
    }
  },
  components: {
    UsersAddNew,
    AdminEdit,
    AdminDelete
  },
  computed: {
    listUsers() {
      return this.$store.getters['user/getUsers']
    }
  },
  methods: {
    fetchUsers () {
      this.$store.dispatch('user/fetchUsers')
    }
  },
  mounted () {
    this.fetchUsers()
  }
}
</script>

<style>
</style>