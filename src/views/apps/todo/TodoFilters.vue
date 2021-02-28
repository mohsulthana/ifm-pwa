<!-- =========================================================================================
    File Name: TodoAddNew.vue
    Description: Add new todo component
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="todo__filters-container">

        <!-- all -->
        <div class="px-6 py-4">
            <router-link tag="span" class="flex cursor-pointer" :class="{'text-primary': todoFilter == 'all'}" :to="`${baseUrl}/all`">
                <feather-icon icon="LayersIcon" :svgClasses="[{'text-primary stroke-current': todoFilter == 'all'}, 'h-6 w-6']"></feather-icon>
                <span class="text-lg ml-3">All</span>
            </router-link>
        </div>

        <vs-divider></vs-divider>

        <!-- starred -->
        <div class="px-6 py-4">
            <h5>Filters</h5>

            <template v-for="filter in todoFilters">
                <router-link tag="span" class="flex mt-6 cursor-pointer" :class="{'text-primary': todoFilter == filter.filter}" :to="`${baseUrl}/${filter.filter}`" :key="filter.filter">
                    <feather-icon :icon="filter.icon" :svgClasses="[{'text-primary stroke-current': todoFilter == filter.filter}, 'h-6 w-6']"></feather-icon>
                    <span class="text-lg ml-3">{{ filter.filterName }}</span>
                </router-link>
            </template>
        </div>
    </div>
</template>

<script>

export default{
  data () {
    return {
      todoFilters: [
        { filterName: 'Not Completed', filter: 'starred', icon: 'StarIcon' },
        { filterName: 'On Progress', filter: 'important', icon: 'InfoIcon' },
        { filterName: 'Done', filter: 'completed', icon: 'CheckIcon' }
      ]
    }
  },
  computed: {
    taskTags () {
      return this.$store.state.todo.taskTags
    },
    todoFilter () {
      return this.$route.params.filter
    },
    baseUrl () {
      const path = this.$route.path
      return path.slice(0, path.lastIndexOf('/'))
    }
  }
}
</script>
