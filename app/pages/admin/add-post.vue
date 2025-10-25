<script setup lang="ts">
import ImageUpload from "~/components/ImageUpload.vue";

const {$listen} = useNuxtApp()
$listen('picture:insert', (html: string) => {
  editor.value.text += html
})
$listen('dialog:close', () => {
  showUpload.value = false
})
const editor = ref({title: '', text: ''})
const images = ref([])
const showUpload = ref(true)
const actions = {
  upload: {
    tip: 'add image',
    icon: 'mdi-image',
    label: 'Image',
    handler: () => showUpload.value = true,

  },
  save: {
    tip: 'save post',
    icon: 'mdi-diskette',
    label: 'Save',
    handler: save,
  },
}
const toolbar = [
  ['bold', 'italic', 'underline'],
  ['link', 'fullscreen'],
  ['undo', 'redo'],
  ['upload','save']
]

async function save() {
  const post = await useNuxtApp().$POST('/blog/post/save', editor.value)
  if (post?.id) {
    navigateTo(`/blog/post-${post.id}`)
  }else{
    console.log(post)
  }
}
</script>

<template lang="pug">
  q-input(v-model="editor.title" placeholder="Title")
  q-editor(v-model="editor.text" :definitions="actions" :toolbar="toolbar")
  //div(v-html="editor" )
  q-dialog(v-model="showUpload" full-width full-height position="bottom")
    ImageUpload

</template>

<style scoped lang="sass">
.picture
  max-width: 300px
  max-height: 100px
</style>