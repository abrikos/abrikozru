<script setup lang="ts">
import DeleteButton from "~/components/DeleteButton.vue";

const {$listen} = useNuxtApp()
const pictures = ref([])

$listen('picture:delete', load)

async function load() {
  pictures.value = await useNuxtApp().$GET('/blog/pictures') as never[]
}

onMounted(load)

</script>

<template lang="pug">
  q-uploader(url="/api/blog/upload" multiple auto-upload @uploaded="load" accept="image/*")
    template(v-slot:list="scope")
      span Upload images
  div.pictures
    div.pic-wrapper(v-for="picture in pictures")
      div.picture
        img(:src="`/api/blog/picture/${picture}`")
        q-tooltip {{picture}}
      div.tools.text-right
        DeleteButton(:name="picture" :path="`/blog/picture`" :id="picture" event="picture:delete")
</template>

<style scoped lang="sass">
$picture-size: 130px
.pictures
  display: flex
  .pic-wrapper
    border: 1px solid silver
    margin: 5px
    background-color: silver
  .picture
    background-color: white
    width: $picture-size
    height: $picture-size
    //border: 1px solid silver
    display: flex
    flex-wrap: wrap
    align-items: center
    justify-content: center
    margin: 1px
    img
      border: solid 1px silver
      max-width: $picture-size - 2px
      max-height: $picture-size - 2px
</style>