<template>
  <div>
    <vx-card title="Project folder">
      <!-- TABLE ACTION COL-2: ADD NEW USERS -->
      <template slot="actions">
        <project-add-new/>
      </template>
      <vs-table max-items="10" pagination search stripe :data="projectList">
        <template slot="thead">
          <vs-th sort-key="no">No</vs-th>
          <vs-th sort-key="project">Project</vs-th>
          <vs-th sort-key="description">Description</vs-th>
          <vs-th sort-key="tag">Tag</vs-th>
        </template>

        <template slot-scope="{ data }">
          <router-link :to="{path: '/project-detail/' + data[indextr].id}" :key="indextr" v-for="(tr, indextr) in data" tag="tr">
          <!-- <vs-tr :key="indextr" v-for="(tr, indextr) in data"> -->
            <vs-td :data="data[indextr].project">
              {{ indextr + 1 }}
            </vs-td>
            <vs-td :data="data[indextr].project">
              {{ data[indextr].project }}
            </vs-td>
            <vs-td :data="data[indextr].description">
              {{ data[indextr].description }}
            </vs-td>
            <vs-td :data="data[indextr].tag" v-if="data[indextr].tag != null">
              <div
                class="h-3 w-3 inline-block rounded-full mr-2"
                :style="{background: data[indextr].tag_color}"
              ></div>
              <span>{{ data[indextr].tag_name }}</span>
            </vs-td>
            <vs-td :data="data[indextr].tag" v-else>
                          No tag
            </vs-td>
          <!-- </vs-tr> -->
          </router-link>
        </template>
      </vs-table>
    </vx-card>
  </div>
</template>

<script>
import ProjectAddNew          from './ProjectAddNew.vue'
import ProjectEdit            from './ProjectEdit.vue'
import ProjectDelete           from './ProjectDelete.vue'

export default {
  name: 'users-table',
  data () {
    return {
      projects: [],
      customers: []
    }
  },
  components: {
    ProjectAddNew,
    ProjectEdit,
    ProjectDelete
  },
  computed: {
    projectList () {
      return this.$store.getters['project/getProjects']
    }
  },
  methods: {
    fetchProjects () {
      this.$store.dispatch('project/fetchProjects')
        .then((response) => {
          this.projects = response.data
        })
    }
  },
  created () {
    this.fetchProjects()
  }
}
</script>

<style>
tr:hover {
  background: #F8F8F8;
  cursor: pointer;
  color: #0158A3;
  transform: translateY(-4px);
}
</style>