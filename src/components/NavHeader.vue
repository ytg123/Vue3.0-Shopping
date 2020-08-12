<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="javascript:;" v-if="username" @click="_goLogOut">退出</a>
          <a href="javascript:;" v-if="username" @click="_goOrderList">我的订单</a>
          <a href="javascript:;" v-if="!username" @click="_goLogin">登录</a>
          <a href="javascript:;" v-if="!username">注册</a>
          <a href="javascript:;" class="my-cart" @click="_goCart">
            <span class="icon-cart"></span>
            购物车({{cartNum ? cartNum : 0}})
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo"><a @click="_back"></a></div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="(item) in phoneList" :key="item.id">
                  <a :href="'/#/product/' + item.id" target="_blank">
                    <div class="pro-img"><img :src="item.mainImage" :alt="item.name" /></div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{currency(item.price)}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>红米</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img"><img src="../../public/imgs/item-box-1.png" alt="手机" /></div>
                    <div class="pro-name">小米CC9</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img"><img src="../../public/imgs/item-box-1.png" alt="手机" /></div>
                    <div class="pro-name">小米CC9</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, onMounted  } from 'vue'  //computed
  import axios from 'axios'
  import $Api from '@/api/index.js'
  import { useRouter } from 'vue-router'
  import { useStore  } from 'vuex' //mapGetters
export default {
  name: 'navHeader',
  setup(){
    const router = useRouter()
    const username = ref('')
    const cartNum = ref(0)
    // const cartNum = computed(() =>  {
    //   mapGetters(['cartCount'])
    // })
    const store = useStore()
    //手机列表
    const phoneList = ref([])
    const getProductList = async () => {
      const {
        list
      } = await axios({
        method:'get',
        url:$Api.getProduct,
        params:{
          categoryId:'100012',
          pageSize:6
        }
      })
      if(list.length === 0){
        phoneList.value = []
      }else{
        phoneList.value = list.slice(0,6)
      }
    }

    //资金过滤
    const currency = (val) => {
      if(!val) return '0.00';
      return '￥' + val.toFixed(2) + '元'
    }

    //去往购物车
    const _goCart = () => {
      router.push({
        path:'/Cart'
      })
    }
    //去往登录
    const _goLogin = () => {
      router.push({
        path:'/Login'
      })
    }

    //退出
    const _goLogOut = async() => {
        await axios({
          method:'post',
          url:$Api.logOut
        })
        store.dispatch('saveUserName',null)
        router.push({
          path:'/Login'
        })
    }
    
    const _back = () => {
      router.push({
        path:'/Index'
      })
    }
    
    const _goOrderList = () => {
      router.push({
        path:'/Order/List'
      })
    }
    
    onMounted(() => {
      getProductList()
      username.value = store.state.username
      cartNum.value = store.state.cartCount
    })

    return {
      username,
      cartNum,
      phoneList,
      getProductList,
      currency,
      _goCart,
      _goLogin,
      _goLogOut,
      _back,
      _goOrderList
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin.scss';
@import '../assets/scss/config.scss';
@import '../assets/scss/base.scss';
.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: $colorB;
    // display: flex;
    // justify-content: center;
    @include flex(center, flex-start);
    a {
      color: #b0b0b0;
      margin-right: 17px;
      display: inline-block;
      height: 100%;
    }
    .my-cart {
      width: 110px;
      background-color: $colorA;
      text-align: center;
      color: #fff;

      .icon-cart {
        @include bgImg(16px, 12px, '../../public/imgs/icon-cart-checked.png');
        margin-right: 4px;
      }
    }
    .container {
      .topbar-menu {
      }
      .topbar-user {
      }
    }
  }

  .nav-header {
    @include flex(center, flex-start);
    .container {
      height: 112px;
      position: relative;
      .header-logo {
        display: inline-block;
        width: 55px;
        height: 55px;
        background-color: $colorA;
        a {
          display: inline-block;
          width: 110px;
          height: 55px;
          &:before {
            content: '';
            @include bgImg(55px, 55px, '../../public/imgs/mi-logo.png');
            transition: margin 0.2s;
          }
          &:after {
            content: '';
            @include bgImg(55px, 55px, '../../public/imgs/mi-home.png');
          }
          &:hover:before {
            margin-left: -55px;
            transition: margin 0.2s;
          }
        }
      }

      .header-menu {
        display: inline-block;
        padding-left: 209px;
        width: 53%;
        .item-menu {
          display: inline-block;
          color: $colorB;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px;
          margin-right: 20px;
          span {
            cursor: pointer;
          }
          &:hover {
            color: $colorA;
            .children {
              height: 220px;
              opacity: 1;
            }
          }
          .children {
            height: 0;
            opacity: 0;
            overflow: hidden;
            position:absolute;
            background-color: #fff;
            top:112px;
            left: 0;
            z-index: 10;
            width: 1226px;
            border-top: 1px solid $colorH;
            box-shadow: 0 7px 6px 0 rgba(0,0,0,0.11);
            transition: height .2s;
            .product{
              width: 16.6%;
              float: left;
              height: 220px;
              font-size: $fontK;
              line-height: $fontK;
              text-align: center;
              position: relative;
              a{
                display: inline-block;
              }
              img{
                height: 111px;
                width: auto;
                margin-top: 26px;
              }
              .pro-img{
                height: 137px;
              }
              .pro-name{
                margin-top: 19px;
                margin-bottom: 8px;
                color: $colorB;
                font-weight: bold;
              }
              .pro-price{
                color: $colorA;

              }
              &:before{
                content: '';
                position:absolute;
                top: 28px;
                right: 0;
                border-left: 1px solid $colorF;
                height: 100px;
                width: 1px;
              }
              &:last-child:before {
                display: none;
              }
            }

          }
        }
      }
      .header-search {
        width: 319px;
        .wrapper {
          height: 50px;
          border: 1px solid #e0e0e0;
          @include flex(center) input {
            border: none;
            border-right: 1px solid #e0e0e0;
            width: 264px;
            height: 50px;
            line-height: 50px;
            outline: none;
            padding-left: 14px;
            box-sizing: border-box;
          }
          a {
            @include bgImg(18px, 18px, '../../public/imgs/icon-search.png') margin-left: 14px;
          }
        }
      }
    }
  }
}
</style>
