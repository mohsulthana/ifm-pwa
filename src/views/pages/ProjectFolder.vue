<template>
  <div class="vx-row">
    <!-- CHAT CARD -->
    <div
      v-if="projects == ''"
      class="vx-col w-full lg:w-full sm:w-full mb-base"
    >
      <vs-card fixedHeight class="overflow-hidden">
        <div class="text-center mt-5">
          <h3 class="text-primary">No project to do</h3>
        </div>
      </vs-card>
    </div>
    <div
      v-else
      class="vx-col w-full lg:w-1/3 sm:w-1/3 mb-base"
      v-for="(value, index) in projects"
      :key="index"
    >
      <vs-card fixedHeight class="overflow-hidden">
        <div slot="header">
          <h3>
            {{ value.project }}
          </h3>
        </div>
        <div slot="media">
              <VuePureLightbox
    style="width: auto; height: 300px; object-fit: cover"
    :thumbnail="value.image"
    :images="[value.image]"
/>
        </div>
        <div>
          <p>{{ value.description }}</p>
        </div>
        <template slot="footer">
          <vs-row vs-justify="flex-end">
          <vs-button
            type="border"
            color="primary"
            icon="info"
            size="small"
            :to="{ path: `/task/${value.project_id}` }"
            >See tasks</vs-button
          >
          </vs-row>
        </template>
      </vs-card>
    </div>
  </div>
</template>

<script>
import VuePureLightbox from 'vue-pure-lightbox'

export default {
  data () {
    return {
      projects: ''
    }
  },
  components: {
    VuePureLightbox
  },
  methods: {
    fetchProjects () {
      const id = this.$store.state.AppActiveUser.id
      this.$store
        .dispatch('project/fetchProjectFolder', id)
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
.lightbox__element {
  width: 80em !important;
}
.lightbox  {
  z-index: 999999;
}
</style>
<style lang="stylus">
.cardx {
  margin: 15px;
}
</style>
