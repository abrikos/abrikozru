<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useCustomStore} from "~/store/custom-store";

const {loggedUser} = storeToRefs(useCustomStore())
const route = useRoute()
const post = ref()
async function load() {
  post.value = await useNuxtApp().$GET('/blog/post/' + route.params.id)
}
onMounted(load)
</script>

<template lang="pug">
  div(v-if='post')
    h1 {{ post.title }}
      q-btn(icon="mdi-pencil" v-if="loggedUser?.isAdmin")
    div(v-html="post.text")
</template>

<style scoped>

</style>