<template>
  <div id="project-detail">
    <vx-card title="Project Detail" class="mb-base">
      <template slot="actions">
        <todo-add-new :projectId="project.id" />
      </template>
      <!-- Avatar -->
      <div class="vx-row">
        <!-- Avatar Col -->
        <div class="vx-col" id="avatar-col">
          <div class="img-container mb-4">
            <img :src="project.qr_code" class="rounded" height="250" />
          </div>
        </div>
        <!-- Information - Col 1 -->
        <div class="vx-col flex-1" id="account-info-col-1">
          <table>
            <tr>
              <td class="font-semibold">Project</td>
              <td>{{ project.project }}</td>
            </tr>
            <tr>
              <td class="font-semibold">Description</td>
              <td>{{ project.description }}</td>
            </tr>
          </table>
        </div>
        <!-- /Information - Col 1 -->
        <!-- {{project}} -->
        <div class="vx-col flex-1" id="account-info-col-1">
          <table>
            <tr>
              <td class="font-semibold">Created Date</td>
              <td>{{ project.created_date }}</td>
            </tr>
            <tr>
              <td class="font-semibold">Updated Date</td>
              <td>{{ project.updated_date }}</td>
            </tr>
          </table>
        </div>
        <div class="vx-col w-full flex" id="account-manage-buttons">
          <project-edit :projectId="project.id" />
          <project-delete :projectId="project.id" />
        </div>
      </div>
    </vx-card>
    <vx-card title="Tasks available" class="mb-base">
      <vs-list>
        <vs-list-item
          v-for="(value, index) in task"
          :key="index"
          :title="value.task"
          :subtitle="value.status"
        >
          <vs-button icon-pack="feather" icon="icon-edit" color="primary"
            >Edit</vs-button
          >
        </vs-list-item>
      </vs-list>
    </vx-card>
  </div>
</template>

<script>
import ProjectEdit from './ProjectEdit.vue'
import ProjectDelete from './ProjectDelete.vue'
import TodoAddNew from './apps/todo/TodoAddNew.vue'

export default {
  data () {
    return {
      id: this.$route.params.id
    }
  },
  methods: {
    fetchSingleProject () {
      this.$store.dispatch('project/fetchSingleProject', this.id)
    }
  },
  components: {
    TodoAddNew,
    ProjectEdit,
    ProjectDelete
  },
  created () {
    this.$store.dispatch('todo/fetchTasks', this.id)
    this.fetchSingleProject()
  },
  computed: {
    project () {
      return this.$store.getters['project/getSingleProject'].data
    },
    task () {
      return this.$store.getters['todo/getTasks']
    }
  }
}
</script>

<style lang="scss" scoped>
.list-view-item {
  .item-name,
  .item-description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .item-name {
    -webkit-line-clamp: 2;
  }

  .item-description {
    -webkit-line-clamp: 5;
  }

  .grid-view-img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    transition: 0.35s;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);

    .grid-view-img {
      opacity: 0.9;
    }
  }
}
</style>

