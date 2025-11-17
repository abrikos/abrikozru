<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useCustomStore} from "~/store/custom-store";

const posts = ref([])
async function load() {
  posts.value = await useNuxtApp().$GET('/blog/posts') as never[]
}
onMounted(load)
const {loggedUser, loading} = storeToRefs(useCustomStore())
</script>

<template lang="pug">
  div(v-for ="post of posts")
    q-btn(:to="{path:'/admin/post-edit', query:{id:post.id}}" v-if="loggedUser?.isAdmin" icon="mdi-pencil" )
    h1 {{ post.title }}
    div(v-html="post.text")
</template>

<style scoped>

</style>