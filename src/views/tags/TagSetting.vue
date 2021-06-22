<template>
  <vx-card no-shadow title="Tags available">
    <template slot="actions">
      <tag-add-new />
    </template>

    <div v-if="tags.length > 0">
      <div
        class="flex flex-wrap items-center justify-between mb-base"
        v-for="(value, index) in tags"
        :key="index"
      >
        <div>
          <vs-icon
            class="ml-1 h-3 w-3 rounded-full mr-5"
            size="small"
            icon="icon-tag"
            icon-pack="feather"
            :color="value.tag_color"
          ></vs-icon>
          <span class="text-lg">{{ value.tag_name }}</span>
        </div>
        <vs-button
          @click="openConfirm()"
          type="border"
          disabled
          icon-pack="feather"
          color="danger"
          icon="icon-x"
          size="small"
          ></vs-button
        >
      </div>
    </div>

    <div v-else>
      <h6>No tags yet</h6>
    </div>
    <!-- Save & Reset Button -->
    <!-- <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2">Save Changes</vs-button>
      <vs-button class="ml-4 mt-2" type="border" color="warning"
        >Reset</vs-button
      >
    </div> -->
  </vx-card>
</template>

<script>
import TagAddNew from './TagAddNew.vue'
export default {
  components: { TagAddNew },
  data () {
    return {}
  },
  methods: {
    fetchTags () {
      this.$store.dispatch('tag/fetchTags')
    }
  },
  mounted () {
    this.fetchTags()
  },
  computed: {
    tags () {
      return this.$store.getters['tag/getTags']
    }
  }
}
</script>
