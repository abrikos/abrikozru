<script setup lang="ts">
import {storeToRefs} from 'pinia'; // import storeToRefs helper hook from pinia
import {useCustomStore} from '~/store/custom-store';
import {useCookie} from "#app";

const config = useAppConfig()
const route = useRoute()
const {logUserOut} = useCustomStore(); // use authenticateUser action from  auth store
const {loggedUser, loading} = storeToRefs(useCustomStore())
const themeWidth = useCookie<string>('themeWidth');
const drawerSide = useCookie<string>('drawerSide');
const leftDrawerOpen = ref(true);
const pages = ref()

const pagesAdmin = [
  {to: '/admin/user-list', label: 'Список пользователей', icon: 'mdi-text-account'},
]
const version = ref()
onMounted(()=>{
  useNuxtApp().$GET('/git-commit').then((res)=>{
    version.value = res;
  })
  pages.value = [
    {to: '/blog', label: 'Blog', icon: 'mdi-nas'},
  ]
})

async function clearBase(){
  if(!window.confirm('Clear base?')) return
  await useNuxtApp().$PUT('/admin/clear/base')
  navigateTo('/admin/import')
}

</script>

<template lang="pug">
  q-layout(view="hHh Lpr lff")
    q-header
      q-linear-progress#progress(color="orange" indeterminate v-if="loading" )
      q-toolbar
        q-btn(v-if="loggedUser"  flat @click="leftDrawerOpen = !leftDrawerOpen" round dense icon="mdi-menu")
        //q-btn(v-if="loggedUser" flat round dense icon="menu" @click="toggleDrawer")
        q-toolbar-title Blog abrikos
        q-space
        q-btn.flex.la-align-center(flat dense no-caps v-if="loggedUser" to="/user/cabinet") {{loggedUser.email}}
        q-btn(v-if="loggedUser" @click="logUserOut" icon="mdi-logout" )
        q-btn(v-if="!loggedUser" to="/user/login" icon="mdi-login" )
        //ThemeSwitch
    q-drawer(v-if="loggedUser" v-model="leftDrawerOpen" bordered :side="drawerSide || 'left'")
      q-list
        //q-item(to="http://srvgfg.qtech.ru:8080")
          q-item-section Старая версия
        div(v-for="page in pages")
          q-item(:to="page.to")
            q-item-section(avatar)
              q-icon(:name="page.icon")
            q-item-section {{page.label}}

        div(v-if="loggedUser?.isAdmin")
          //q-separator
          q-item
            q-item-section
              i Служебный раздел:
          q-item(v-for="page in pagesAdmin" :to="page.to" active-class="active" :active="route.fullPath===page.to || route.path===page.to")
            q-item-section(avatar)
              q-icon(:name="page.icon")
            q-item-section {{page.label}}
          q-item
            q-btn(@click="clearBase") Clear base
        //q-item
          q-item-section
            i Настройки
      small.text-caption(v-if="loggedUser?.isAdmin")
        div Last update:
        div {{version}}
    q-page-container(:class="themeWidth?'page-wrapper':''" )
      q-page
        slot


</template>

<style scoped lang="sass">
.page-wrapper
  max-width: 1600px
  margin: auto
#progress
  position: absolute
  height: 10px
  z-index: 100000000
</style>
