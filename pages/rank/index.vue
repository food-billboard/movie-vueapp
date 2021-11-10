<template>
  <div @click="logout">rank</div>
</template>
<script>
export default {
  methods: {
    async logout() {
      await this.$API_USER.logout()
    }
  }
}
</script>