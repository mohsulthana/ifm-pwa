<template>
  <vs-tabs :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs" :key="isSmallerScreen">

    <!-- GENERAL -->
    <vs-tab icon-pack="feather" icon="icon-tag" :label="!isSmallerScreen ? 'Tags' : ''">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <tag-setting />
      </div>
    </vs-tab>
  </vs-tabs>
</template>

<script>
import TagSetting from '../../tags/TagSetting.vue'

export default {
  components: {
    TagSetting
  },
  data () {
    return {

    }
  },
  computed: {
    isSmallerScreen () {
      return this.$store.state.windowWidth < 768
    }
  }
}
</script>

<style lang="scss">
#profile-tabs {
  .vs-tabs--content {
    padding: 0;
  }
}
</style>
