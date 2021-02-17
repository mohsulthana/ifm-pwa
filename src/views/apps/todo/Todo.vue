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

            <todo-add-new />

            <component :is="scrollbarTag" class="todo-scroll-area" :settings="settings" :key="$vs.rtl">
                <todo-filters @closeSidebar="toggleTodoSidebar"></todo-filters>
            </component>

        </vs-sidebar>
        <div :class="{'sidebar-spacer': clickNotClose}" class="no-scroll-content border border-r-0 border-b-0 border-t-0 border-solid d-theme-border-grey-light no-scroll-content">

            <div class="flex d-theme-dark-bg items-center border border-l-0 border-r-0 border-t-0 border-solid d-theme-border-grey-light">

                <!-- TOGGLE SIDEBAR BUTTON -->
                <feather-icon class="md:inline-flex lg:hidden ml-4 mr-4 cursor-pointer" icon="MenuIcon" @click.stop="toggleTodoSidebar(true)" />

                <!-- SEARCH BAR -->
                <vs-input icon-no-border size="large" icon-pack="feather" icon="icon-search" placeholder="Search..." v-model="searchQuery" class="vs-input-no-border vs-input-no-shdow-focus w-full" />
            </div>

            <!-- TODO LIST -->
            <component :is="scrollbarTag" class="todo-content-scroll-area" :settings="settings" ref="taskListPS" :key="$vs.rtl">

                <transition-group class="todo-list" name="list-enter-up" tag="ul">
                  <li class="cursor-pointer todo_todo_item">
                        <div class="px-4 py-4 list-item-component">
                          <div class="vx-row">
                              <div class="vx-col w-full sm:w-5/6 flex sm:items-center sm:flex-row flex-col">
                                  <div class="flex items-center">
                                      <vs-checkbox class="w-8 m-0 vs-checkbox-small" @click.stop />
                                      <h6 class="todo-title">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt similique rem, eos ipsa quidem qui et in optio quisquam blanditiis temporibus sequi illum aliquid numquam harum adipisci deleniti perferendis aperiam.</h6>
                                  </div>
                              </div>
                          </div>
                          <div class="vx-row">
                              <div class="vx-col w-full">
                                  <p class="mt-2 truncate">Description</p>
                              </div>
                          </div>
                      </div>
                  </li>
                    <!-- <li
                      class="cursor-pointer todo_todo-item"
                      v-for="(task, index) in taskList"
                      :key="String(task.id)"
                      :style="[{transitionDelay: (index * 0.1) + 's'}]">
                      <todo-task :taskId="task.id" @showDisplayPrompt="showDisplayPrompt($event)" :key="String(task.task) + String(task.description)" />
                        <!--
                        Note: Remove "todo-task" component's key just concat lastUpdated field in li key list.
                        e.g. <li class="..." v-for="..." :key="String(currFilter) + String(task.id) + String(task.lastUpdated)" .. >
                        -->
                </transition-group>
            </component>
            <!-- /TODO LIST -->

        </div>

        <!-- EDIT TODO DIALOG -->
        <todo-edit :displayPrompt="displayPrompt" :taskId="taskIdToEdit" @hideDisplayPrompt="hidePrompt" v-if="displayPrompt"></todo-edit>
    </div>
</template>

<script>
import moduleTodo from "@/store/todo/moduleTodo.js";
import TodoAddNew from "./TodoAddNew.vue";
import TodoTask from "./TodoTask.vue";
import TodoFilters from "./TodoFilters.vue";
import TodoEdit from "./TodoEdit.vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  data() {
    return {
      currFilter: "",
      clickNotClose: true,
      displayPrompt: false,
      taskIdToEdit: 0,
      isSidebarActive: true,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
    };
  },
  watch: {
    todoFilter() {
      const scroll_el = this.$refs.taskListPS.$el || this.$refs.taskListPS;
      scroll_el.scrollTop = 0;

      this.toggleTodoSidebar();

      // Fetch Tasks
      const filter = this.$route.params.filter;
      this.$store.dispatch("todo/fetchTasks", { filter });
      this.$store.commit("todo/UPDATE_TODO_FILTER", filter);
    },
    windowWidth() {
      this.setSidebarWidth();
    },
  },
  computed: {
    todo() {
      return this.$store.state.todo.todoArray;
    },
    todoFilter() {
      return this.$route.params.filter;
    },
    taskList() {
      return this.$store.getters["todo/getTask"];
    },
    searchQuery: {
      get() {
        return this.$store.state.todo.todoSearchQuery;
      },
      set(val) {
        this.$store.dispatch("todo/setTodoSearchQuery", val);
      },
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },
  },
  methods: {
    showDisplayPrompt(itemId) {
      this.taskIdToEdit = itemId;
      this.displayPrompt = true;
    },
    hidePrompt() {
      this.displayPrompt = false;
    },
    setSidebarWidth() {
      if (this.windowWidth < 992) {
        this.isSidebarActive = this.clickNotClose = false;
      } else {
        this.isSidebarActive = this.clickNotClose = true;
      }
    },
    toggleTodoSidebar(value = false) {
      if (!value && this.clickNotClose) return;
      this.isSidebarActive = value;
    },
  },
  components: {
    TodoAddNew,
    TodoTask,
    TodoFilters,
    TodoEdit,
    VuePerfectScrollbar,
  },
  created() {
    this.$store.registerModule("todo", moduleTodo);
    this.setSidebarWidth();

    const filter = this.$route.params.filter;

    // Fetch Tasks
    this.$store.dispatch("todo/fetchTasks", { filter });
    this.$store.commit("todo/UPDATE_TODO_FILTER", filter);

    // Fetch Tags
    this.$store.dispatch("todo/fetchTags");
  },
  beforeUpdate() {
    this.currFilter = this.$route.params.filter;
  },
  beforeDestroy() {
    this.$store.unregisterModule("todo");
  },
  mounted() {
    this.$store.dispatch("todo/setTodoSearchQuery", "");
  },
};
</script>


<style lang="scss">
@import "@/assets/scss/vuexy/apps/todo.scss";
</style>
