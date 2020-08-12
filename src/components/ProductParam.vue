<template>
  <div class="product-param" :class="{'isFiexed':isFiex}">
    <div class="container">
      <div class="pro-title">
        {{title}}
      </div>
      <div class="pro-param">
        <a href="javascript:;">概述</a>
        <span>|</span>
        <a href="javascript:;">概述</a>
        <span>|</span>
        <a href="javascript:;">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref,onMounted,onUnmounted } from 'vue'
  export default {
    name:'product-param',
    props:{
      title:String
    },
    setup() {
      const isFiex = ref(false)
      const OFFSET_HEIGHT = 152
      const initHeight = () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        isFiex.value = scrollTop > OFFSET_HEIGHT ? true : false
      }

      onMounted(() => {
        window.addEventListener('scroll', initHeight)
      })

      onUnmounted(() => {
         window.removeEventListener('scroll', initHeight,false)
      })

      return {
        initHeight,
        isFiex
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../assets/scss/config.scss';
@import '../assets/scss/mixin.scss';
@import '../assets/scss/base.scss';
.product-param{
  height: 70px;
  line-height: 70px;
  border-top: 1px solid $colorH;
  background-color: $colorG;
  box-shadow: 0 5px 5px $colorE;
  &.isFiexed{
    position: fixed;
    top: 0;
    width: 100%;
  }
  .container{
    margin: auto;
    @include flex();
    .pro-title{
      font-size: $fontH;
      color: $colorB;
      font-weight: bold;
    }
    .pro-param{
      font-size: $fontJ;
      span{
        margin:0 10px;
      }
      a{
        color: $colorC;

      }
    }
  }
}
</style>
