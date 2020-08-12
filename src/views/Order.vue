<template>
  <div>
    <order-header :title="title">
      <template v-slot:tips>
        <span>温馨提示：{{tip}}</span>
      </template>
    </order-header>
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import OrderHeader from '../components/OrderHeader.vue'
  import NavFooter from '../components/NavFooter.vue'
  import ServiceBar from '../components/ServiceBar.vue'
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  export default {
    name:'order',
    components: {
      OrderHeader,
      NavFooter,
      ServiceBar
    },
    setup(){

      const title = ref('')
      const tip = ref('')
      const router = useRouter()
      onMounted(() => {
        let {
          currentRoute:{
            value:{
              path
            }
          }
        } = router;
        console.log(path);
        switch (path){
          case '/Order/List':
            title.value = '订单列表'
            tip.value = '请谨防钓鱼链接或诈骗电话，了解更多>'
            break;
          case '/Order/Pay':
            title.value = '订单支付'
            tip.value = '请谨防钓鱼链接或诈骗电话，了解更多>'
            break;
          case '/Order/Alipay':
            title.value = '订单支付'
            tip.value = '请谨防钓鱼链接或诈骗电话，了解更多>'
            break;
          case '/Order/Confirm':
            title.value = '订单确认'
            tip.value = '请认真填写收货地址'
            break;
        }
      })

      return {
        title,
        tip
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
