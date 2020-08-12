<template>
  <div class="message">
    <div
      :style="style"
      :class="{
        'slideDown':!isShowPop,
        'slideUp':isShowPop,
        'warn': type == 'warn',
        'error': type == 'error'
      }"
      v-show="isShowPop">
      {{con}}
    </div>
  </div>
</template>

<script>
  import { ref , watchEffect} from 'vue'
  export default {
    name:'message',
    props:{
      con:String,
      style:Object,
      delay:{
        type:[Number,String],
        default: 1000
      },
      type:{
        type:String,
        default:''
      },
      isShowF:{
        type:Boolean,
        default: false
      }
    },
    setup(props){
      const {
        delay,
        isShowF
      } = props

      
      let isShowPop = ref(isShowF)

      setTimeout(() => {
        isShowPop.value = false
      },delay)
      watchEffect(() => {
        console.log(isShowPop.value);
      })

      return {
        isShowPop
      }
    }
  }
</script>

<style lang="scss" scoped>
  .message{
    min-width: 200px;
    min-height: 60px;
    width: 200px;
    height: 60px;
    >div{
      width: 200px;
      height: 60px;
      background-color: #00ff7f;
      color: #fff;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      box-sizing: border-box;
      position: absolute;
      right: 5px;

      &.error{
        background-color: #f00 !important;
      }

      &.warn{
        background-color: #fa0 !important;
      }

      &.slideDown {
        animation: slideDown 0.6s linear;
        top: 20%;
      }
      &.slideUp {
        animation: slideUp 0.6s linear;
      }
    }

    @keyframes slideDown {
      from {
        top: -20%;
        opacity: 0;
      }
      to {
        top: 20%;
        opacity: 1;
      }
    }
    @keyframes slideUp {
      from {
        top: 20%;
        opacity: 1;
      }
      to {
        top: -20%;
        opacity: 0;
      }
    }
  }
</style>
