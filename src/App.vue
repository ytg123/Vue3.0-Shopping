<template>
  <router-view/>
</template>
<script>
  import { onMounted } from 'vue'
  import axios from 'axios'
  import $Api from '@/api/index.js'
  import { useStore } from 'vuex'
  export default {
    name:'App',
    setup() {
      const store = useStore()
      const getUser = async () => {
        const {
          username
        } = await axios({
          method:'get',
          url: $Api.getUserInfo
        })
        store.dispatch('saveUserName',username ? username : 'Jack')
      }

      const getCartCount = async () => {
       
        const count = await axios({
          method:'get',
          url: $Api.getCartsSum
        })
        store.dispatch('setCartSum',count)  
      }

      onMounted(() => {
        getUser()
        getCartCount()
      })

      return {
        getUser,
        getCartCount
      }
    }

  }

</script>
<style lang="scss">
  @import './assets/scss/config.scss';
  @import './assets/scss/reset.scss';
  @import './assets/scss/button.scss';
</style>
