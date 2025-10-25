<script setup lang="ts">
const posts = ref([])
async function load() {
  posts.value = await useNuxtApp().$GET('/blog/posts')
}
onMounted(posts)
</script>

<template lang="pug">
div  {{ posts }}
</template>

<style scoped>

</style>