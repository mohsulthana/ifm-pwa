<template>
  <div id="project-detail">
    <vx-card title="Project Detail" class="mb-base">
      <template slot="actions">
        <PDF-Uploader />
      </template>
      <!-- Avatar -->
      <div class="vx-row">
        <!-- Avatar Col -->
        <div class="vx-col" id="avatar-col">
          <div class="img-container mb-4">
            <img
              :src="project.image"
              class="ml-5 img-fluid rounded"
              height="200"
            />
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
            <tr>
              <td class="font-semibold">Start Date</td>
              <td>{{ project.start_date }}</td>
            </tr>
            <tr>
              <td class="font-semibold">End Date</td>
              <td>{{ project.end_date }}</td>
            </tr>
          </table>
        </div>
        <div class="vx-col flex-1" id="account-info-col-1">
          <table></table>
        </div>
        <div class="vx-col w-full flex" id="account-manage-buttons"></div>
      </div>
      <template slot="footer">
        <div class="flex justify-end">
          <project-edit :projectId="project.id" />
          <project-delete :projectId="project.id" />
        </div>
      </template>
    </vx-card>
    <vx-card v-if="task == ''" title="No Tasks available" class="mb-base">
      <template slot="actions">
        <todo-add-new :projectId="project.id" />
      </template>
      <p class="text-warning">To create more task, press button above</p>
    </vx-card>
    <vx-card v-else title="Tasks available" class="mb-base">
      <template slot="actions">
        <todo-add-new :projectId="project.id" />
      </template>
      <vs-list>
        <vs-list-item
          v-for="(value, index) in task"
          :key="index"
          :title="value.task"
          :subtitle="value.status"
        >
          <todo-modal :taskId="value.id" />
          <todo-delete :taskId="value.id" />
        </vs-list-item>
      </vs-list>
    </vx-card>
  </div>
</template>

<script>
import PDFUploader from '@/components/PDFUploader.vue'
import ProjectEdit from './ProjectEdit.vue'
import ProjectDelete from './ProjectDelete.vue'
import TodoAddNew from './apps/todo/TodoAddNew.vue'
import TodoModal from './apps/todo/TodoModal.vue'
import TodoDelete from './apps/todo/TodoDelete.vue'

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
    ProjectDelete,
    TodoModal,
    TodoDelete,
    PDFUploader
  },
  created () {
    this.$store.dispatch('todo/getTasksByProject', this.id)
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

