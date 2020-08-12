<template>
  <div class="login">
    <message :con="con"   :isShowF="isShow" v-show="isShow"></message>
    <div class="container">
      <a @click="_toIndex"><img src="/imgs/login-logo.png" alt=""></a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">帐号登录</span><span class="sep-line">|</span><span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="username">
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="register">手机短信登录/注册</div>
            <div class="reg">立即注册<span>|</span>忘记密码？</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a href="http://www.365terry.top" target="_blank">Terry 主页</a><span>|</span>
      </div>
      <p class="copyright">Copyright © {{year}} www.365terry.top All Rights Reserved.</p>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import axios from 'axios'
import $Api from '@/api/index.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
// import  Storage from '@/storage/index.js'
import Message from '@/components/Message.vue'
export default {
  name: 'login',
  components:{
    Message
  },
  setup() {
    const year = ref(null)
    year.value = new Date().getFullYear()

    const username = ref('')
    const password = ref('')
    const userId = ref('')
    const router = useRouter()
    const store = useStore()
    // console.log(Storage)
    // const { setItem } = Storage
    const login = async () =>{
      try{
        const {
          id,username:uname
        } = await axios({
          method:'post',
          url: $Api.logIn,
          data:{
            username:username.value,
            password:password.value
          }
        })
        if(id){
          store.dispatch('saveUserName',uname)
          // setItem('userId',id)
          router.push({
            path:'/index'
          })
        }
      }catch(e){
        console.log(e)
      }
    }
    const isShow = ref(false)
    const con = ref('')
    const popFn = (str) => {
      con.value = str
      isShow.value = true
      setTimeout(() => {
        isShow.value = false
      },1000)
    }
    const register = async () => {
      try{
        const {
          msg
        } = await axios({
          method:'post',
          url: $Api.register,
          data:{
            username:'adminTerry',
            password:'admin111',
            email:'admin111@163.com'
          }
        })
        popFn(msg)
        router.push({
          path:'/Login'
        })
      }catch(e){
        const {
          msg
        } = e
        popFn(msg)
      }
    }
    
    const _toIndex = () => {
      router.push({
        path:'/Index'
      })
    }
    
    return {
      year,
      username,
      password,
      userId,
      login,
      register,
      _toIndex
    }
  }

}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/config.scss';
.login{
  &>.container{
    height:113px;
    width: $min-width;
    margin:auto;
    img{
      width:auto;
      height:100%;
    }
  }
  .wrapper{
    background:url('/imgs/login-bg.jpg') no-repeat center;
    .container{
      width: $min-width;
      margin:auto;
      height:576px;
      position: relative;
      .login-form{
          box-sizing: border-box;
          padding-left: 31px;
          padding-right: 31px;
          width: 410px;
          height: 510px;
          background-color: $colorG;
          position: absolute;
          top: 35px;
          right: 0;
        h3{
          line-height:23px;
          font-size:24px;
          text-align:center;
          margin:40px auto 49px;
          .checked{
            color:#FF6600;
          }
          .sep-line{
            margin:0 32px;
          }
        }
        .input{
          display:inline-block;
          width:348px;
          height:50px;
          border:1px solid #E5E5E5;
          margin-bottom:20px;
          input{
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
            box-sizing: border-box;
          }
        }
        .btn{
          width:100%;
          line-height:50px;
          margin-top:10px;
          height: 50px;
          text-align: center;
          font-size:$fontI;
        }
        .tips{
          margin-top:14px;
          display:flex;
          justify-content:space-between;
          font-size:$fontJ;
          cursor:pointer;
          .sms{
            color:$colorA;
          }
          .reg{
            color:$colorD;
            span{
              margin:0 7px;
            }
          }
        }
      }
    }
  }
  .footer{
    height:100px;
    padding-top:60px;
    color:#999999;
    font-size:16px;
    text-align:center;
    .footer-link{
      a{
        color:#999999;
        display:inline-block;
      }
      span{
        margin:0 10px;
      }
    }
    .copyright{
      margin-top:13px;
    }
  }
}
</style>
