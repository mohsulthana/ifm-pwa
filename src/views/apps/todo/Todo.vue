<!-- =========================================================================================
  File Name: Todo.vue
  Description: Todo Application to keep you ahead of time
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div id="todo-app" class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden">
        <vs-sidebar class="items-no-padding" parent="#todo-app" :click-not-close="clickNotClose" :hidden-background="clickNotClose" v-model="isSidebarActive">
          <div >
            <vs-button color="primary" class="w-full mt-5" type="filled" :to="{ path: '/download-data'}" icon="input">Download Data</vs-button>
          </div>

            <component :is="scrollbarTag" class="todo-scroll-area" :settings="settings" :key="$vs.rtl">
                <todo-filters @closeSidebar="toggleTodoSidebar"></todo-filters>
            </component>

        </vs-sidebar>
        <div :class="{'sidebar-spacer': clickNotClose}" class="no-scroll-content border border-r-0 border-b-0 border-t-0 border-solid d-theme-border-grey-light no-scroll-content">

            <div class="flex d-theme-dark-bg items-center border border-l-0 border-r-0 border-t-0 border-solid d-theme-border-grey-light">

                <!-- TOGGLE SIDEBAR BUTTON -->
                <feather-icon class="md:inline-flex lg:hidden ml-4 mr-4 cursor-pointer" icon="MenuIcon" @click.stop="toggleTodoSidebar(true)" />

                <!-- SEARCH BAR -->
                <vs-input icon-no-border size="large" icon-pack="feather" icon="icon-search" placeholder="Search..." class="vs-input-no-border vs-input-no-shdow-focus w-full" />
            </div>

            <!-- TODO LIST -->
          <div v-if="taskList.length > 0">
            <VuePerfectScrollbar class="scroll-area" v-once :settings="settings" :key="$vs.rtl">
              <!-- <component :is="scrollbarTag" class="scroll-area" :settings="settings" ref="taskListPS" :key="$vs.rtl"> -->
                  <transition-group class="todo-list" name="list-enter-up" tag="ul" appear>
                      <li
                        class="cursor-pointer todo_todo-item"
                        v-for="(task, index) in taskList"
                        :key="index"
                        :style="[{transitionDelay: (index * 0.1) + 's'}]">
                        <todo-task :task="taskList" :taskId="task.id" :key="String(task.title) + String(task.desc)" />
                          <!--
                          Note: Remove "todo-task" component's key just concat lastUpdated field in li key list.
                          e.g. <li class="..." v-for="..." :key="String(currFilter) + String(task.id) + String(task.lastUpdated)" .. >
                          -->
                      </li>
                  </transition-group>
              <!-- </component> -->
              </VuePerfectScrollbar>
          </div>

            <div class="text-center" v-else>
              <h5 class="mt-5">No task available for this project</h5>
            </div>
            <!-- /TODO LIST -->
        </div>

        <!-- EDIT TODO DIALOG -->
        <todo-edit :displayPrompt="displayPrompt" :taskId="taskIdToEdit" @hideDisplayPrompt="hidePrompt" v-if="displayPrompt"></todo-edit>
    </div>
</template>

<script>
import TodoAddNew          from './TodoAddNew.vue'
import TodoTask            from './TodoTask.vue'
import TodoFilters         from './TodoFilters.vue'
import TodoEdit            from './TodoEdit.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  data () {
    return {
      taskList: [],
      currFilter           : '',
      clickNotClose        : true,
      displayPrompt        : false,
      taskIdToEdit         : 0,
      isSidebarActive      : true,
      settings : {
        maxScrollbarLength : 60,
        wheelSpeed         : 0.30
      }
    }
  },
  watch: {
    todoFilter () {
      const scroll_el = this.$refs.taskListPS.$el || this.$refs.taskListPS
      scroll_el.scrollTop = 0

      this.toggleTodoSidebar()

      // Fetch Tasks
      const filter = this.$route.params.filter
      this.$store.dispatch('todo/getTasksByProject', { filter })
      this.$store.commit('todo/UPDATE_TODO_FILTER', filter)
    },
    windowWidth () {
      this.setSidebarWidth()
    }
  },
  computed: {
    scrollbarTag () { return this.$store.getters.scrollbarTag              },
    windowWidth ()  { return this.$store.state.windowWidth                 }
  },
  methods: {
    firstTask () {
      return this.taskList.find(element => element.status === 'Not Completed')
    },
    showDisplayPrompt (itemId) {
      this.taskIdToEdit  = itemId
      this.displayPrompt = true
    },
    hidePrompt () {
      this.displayPrompt = false
    },
    setSidebarWidth () {
      if (this.windowWidth < 992) {
        this.isSidebarActive = this.clickNotClose = false
      } else {
        this.isSidebarActive = this.clickNotClose = true
      }
    },
    toggleTodoSidebar (value = false) {
      if (!value && this.clickNotClose) return
      this.isSidebarActive = value
    }
  },
  components: {
    TodoAddNew,
    TodoTask,
    TodoFilters,
    TodoEdit,
    VuePerfectScrollbar
  },
  created () {
    this.setSidebarWidth()

    // const filter = this.$route.params.filter

    // Fetch Tasks
    const params = this.$route.params.id
    this.$store.dispatch('todo/fetchTaskForWorker', params)
      .then((response) => {
        this.taskList = response.data
      })
    // this.$store.commit('todo/UPDATE_TODO_FILTER', filter)

    // Fetch Tags
    // this.$store.dispatch('todo/fetchTags')
  },
  beforeUpdate () {
    this.currFilter = this.$route.params.filter
  }
}

</script>


<style lang="scss">
@import "@/assets/scss/vuexy/apps/todo.scss";
// @import "@/../node_modules/perfect-scrollbar/css/perfect-scrollbar.css";

.scroll-area {
  position: relative;
  margin: auto;
  width: auto;
  height: calc(100vh - 210px);
}
</style>
