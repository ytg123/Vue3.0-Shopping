<template>
  <transition name="slide">
    <div class="modal" v-show="showModal">
      <div class="mask"></div>
      <div class="modal-dialog">
        <div class="modal-header">
          <span>{{title}}</span>
          <a href="javascript:;" class="icon-close" @click="_emitno"></a>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <a href="javascript:;" class="btn" v-if="btnType == '1'" @click="_emit">{{sureText}}</a>
          <a href="javascript:;" class="btn btn-default" v-if="btnType == '2'" @click="_emitno">{{cancelText}}</a>
          <div class="btn-group" v-if="btnType == '3'">
            <a href="javascript:;" class="btn" @click="_emit">{{sureText}}</a>
            <a href="javascript:;" class="btn btn-default" @click="_emitno">{{cancelText}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name:'modal',
    props:{
      modalType:{
        type:String,
        default:'form'  //弹框类型  小small  中 middle  大 large  form表单 fprm
      },
      title:String,
      btnType:String, //按钮类型 1  确定  2 取消  3 都有
      sureText:{
        type:String,
        default:'确定'
      },
      cancelText:{
        type:String,
        default:'取消'
      },
      showModal:Boolean
    },
    setup(props,context){
      console.log(props);
      const _emit = () => {
        context.emit('submit')
      }
      const _emitno = () => {
        context.emit('cancel')
      }
      return {
        _emit,
        _emitno
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/config.scss';
  @import '../assets/scss/mixin.scss';
  @import '../assets/scss/modal.scss';
</style>
