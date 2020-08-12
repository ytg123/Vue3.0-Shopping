<template>
  <div class="order-header">
    <div class="container">
      <div class="header-logo"><a @click="_back"></a></div>
      <div class="title">
        <h2>
          {{title}}
          <!-- <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span> -->
          <slot name="tips"></slot>
        </h2>
      </div>
      <div class="username">
        <a href="javascript:;">{{username()}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { onMounted ,computed} from 'vue'  //computed  ref
  import {  mapGetters } from 'vuex'  //useStore
  import { useRouter } from 'vue-router'
  export default {
    name:'order-header',
    props:{
      title:String,

    },
    setup(){

      // const username = ref('')

      // const store = useStore()
      const router = useRouter()

      const { value:{
        username
      } } = computed(() => mapGetters(['username','cartCount']))

      const _back = () => {
        router.push({
          path:'/Index'
        })
      }

      onMounted(() => {

      })

      return {
        username,
        _back
      }

    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/mixin.scss';
  @import '../assets/scss/config.scss';
  @import '../assets/scss/base.scss';
  .order-header{
    padding: 30px 0;
    box-sizing: border-box;

    .title{
      flex: 1;
      margin-left: 50px;
      @include flex(flex-start,flex-start)
      h2{
        font-size:$fontC;
        span{
          font-size:$fontJ;
          color: $colorD;
          margin-left: 10px;
        }
      }
    }
    .username{
      @include flex(center)
      width: 200px;
      a{
        font-size: $fontI;
        color: $colorC;
      }
    }
  }
</style>
