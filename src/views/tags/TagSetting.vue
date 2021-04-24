<template>
  <vx-card no-shadow>
    <h1>Tags available</h1>
      <verte></verte>

    <div class="flex flex-wrap items-center mb-base mt-5">
      <div
        class="ml-1 h-3 w-3 rounded-full mr-4 border-2 border-solid"
        style="background-color: #ffffff"
      />
      <span class="text-lg">Hello</span>
    </div>

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2">Save Changes</vs-button>
      <vs-button class="ml-4 mt-2" type="border" color="warning"
        >Reset</vs-button
      >
    </div>
  </vx-card>
</template>

<script>
export default {
  data() {
    return {
      username: "johny_01",
      name: this.$store.state.AppActiveUser.displayName,
      email: "john@admin.com",
      company: "SnowMash Technologies Pvt Ltd",
    };
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
  },
};
</script>
