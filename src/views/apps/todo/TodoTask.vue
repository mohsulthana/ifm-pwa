<!-- =========================================================================================
    File Name: TodoItem.vue
    Description: Single todo item component
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="px-4 py-4 list-item-component">
    <router-link :to="{ path: `/task-detail/${taskLocal.id}` }" :is="task[0].id !== taskLocal.id ? 'span' : 'router-link'">
      <div class="vx-row">
        <div
          class="vx-col w-full sm:w-5/6 flex sm:items-center sm:flex-row flex-col"
        >
          <div class="flex items-center">
            <h6
              class="todo-title"
              :class="{
                'line-through':
                  taskLocal.status === 'Done' ||
                  taskLocal.status === 'Cancelled',
                  'text-danger': taskLocal.status === 'Cancelled',

              }"
              @click="displayPrompt"
            >
              {{ taskLocal.task }}
            </h6>
          </div>
          <div class="todo-tags sm:ml-2 sm:my-0 my-2 flex">
            <vs-chip v-for="(tag, index) in taskLocal.tags" :key="index">
              <div
                class="h-2 w-2 rounded-full mr-1"
                :class="'bg-' + todoLabelColor(tag)"
              ></div>
              <span>{{ tag | capitalize }}</span>
            </vs-chip>
          </div>
        </div>

        <div class="vx-col w-full sm:w-1/6 ml-auto flex sm:justify-end">
        </div>
      </div>
      <div class="vx-row" v-if="taskLocal.description">
        <div class="vx-col w-full">
          <p
            class="mt-2 truncate"
            :class="{
              'line-through':
                taskLocal.status === 'Done' || taskLocal.status === 'Cancelled',
                'text-danger': taskLocal.status === 'Cancelled',
            }"
          >
            {{ taskLocal.description }}
          </p>
          <p v-if="taskLocal.status == 'Cancelled'" class="text-danger">Cancelled</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import TaskDelete from './TodoDelete'

export default {
  props: {
    taskId: {
      required: true
    },
    task: {
      required: true
    }
  },
  components: {
    TaskDelete
  },
  data () {
    return {
      taskLocal: this.$store.getters['todo/getTask'](this.taskId),
      taskDisble: this.task.find((element) => element.status === 'Not Completed')
    }
  },
  methods: {
    displayPrompt () {
      this.$emit('showDisplayPrompt', this.taskId)
    }
  }
}
</script>
