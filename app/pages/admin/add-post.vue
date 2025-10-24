<script setup lang="ts">
import ImageUpload from "~/components/ImageUpload.vue";

const {$listen} = useNuxtApp()
$listen('picture:insert', (html: string) => {
  editor.value += html
})
$listen('dialog:close', () => {
  showUpload.value = false
})
const editor = ref('')
const images = ref([])
const showUpload = ref(true)
const actions = {
  upload: {
    tip: 'add image',
    icon: 'mdi-image',
    label: 'Image',
    handler: () => showUpload.value = true,

  }
}
const toolbar = [
  ['bold', 'italic', 'underline'],
  ['link', 'fullscreen'],
  ['undo', 'redo'],
  ['upload']
]
</script>

<template lang="pug">
  q-editor(v-model="editor" :definitions="actions" :toolbar="toolbar")
  div(v-html="editor" )
  q-dialog(v-model="showUpload" full-width full-height position="bottom")
    ImageUpload

</template>

<style scoped lang="sass">
.picture
  max-width: 300px
  max-height: 100px
</style>