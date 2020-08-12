<template>
  <div class="ali-pay">
    <loading class="loading" v-if="loading"></loading>
    <div class="form" v-html="contents"></div>
  </div>
</template>

<script>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import $Api from '../api/index.js'
  import { useRouter } from 'vue-router'
  import Loading from '@/components/Loading.vue'
  export default {
    name:'alipay',
    components:{
      Loading
    },
    setup(){
      const router = useRouter()

      const { currentRoute: {
        value:{
          query:{ orderId }}}} = router
      const orderIds = ref(orderId)

      const contents = ref('')
      const loading = ref(true)
      const paySubmit = async() => {
        const {
          content
        } = await axios({
          method:'post',
          url: $Api.pay,
          data:{
            orderId: orderIds.value,
            orderName:'Terry 仿小米商城',
            amount:0.01,
            payType: 1
          }
        })
        contents.value = content

        setTimeout(() => {
          document.forms[0].submit()
        },100)

      }

      onMounted(() => {
        paySubmit()
      })

      return {
        contents,
        loading
      }

    }
  }
</script>

<style lang="scss" scoped>

</style>
