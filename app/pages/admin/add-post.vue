<script setup lang="ts">
import ImageUpload from "~/components/ImageUpload.vue";

const editor = ref('')
const images = ref([])
function paste(e){
  console.log(e)
}
function drop(e){
  console.log(e)
}
</script>

<template lang="pug">
  div.row
    div.col
      q-editor(v-model="editor" @paste="paste" @drop="drop")
      ImageUpload
    div.col
      div(v-html="editor" )
</template>

<style scoped>

</style>