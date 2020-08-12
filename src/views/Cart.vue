<template>
  <div class="cart">
    <message :con="con"  :type="types" :isShowF="isShow" v-show="isShow"></message>
    <order-header title="我的购物车">
      <template v-slot:tips>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1">
              <span class="checkbox" v-bind:class="{ checked: allChecked }" @click="toggleAll"></span>
              全选
            </li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(item, index) in list" v-bind:key="index">
              <div class="item-check"><span class="checkbox" v-bind:class="{ checked: item.productSelected }" @click="updateCart(item)"></span></div>
              <div class="item-name">
                <img :src="item.productMainImage" alt="" />
                <span>{{ item.productName + ' , ' + item.productSubtitle }}</span>
              </div>
              <div class="item-price">{{ item.productPrice }}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item, '-')">-</a>
                  <span>{{ item.quantity }}</span>
                  <a href="javascript:;" @click="updateCart(item, '+')">+</a>
                </div>
              </div>
              <div class="item-total">{{ item.productTotalPrice }}</div>
              <div class="item-del" @click="delProduct(item)"></div>
            </li>
            <li v-if="list.length === 0" style="height: 300px;display: flex;justify-content: center;align-items: center;font-size: 30px;border-top: 1px solid #eaeaea;">
              暂无商品
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/#/index">继续购物</a>
            共
            <span>{{ list.length }}</span>
            件商品，已选择
            <span>{{ checkedNum }}</span>
            件
          </div>
          <div class="total fr">
            合计：
            <span>{{ cartTotalPrices }}</span>
            元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader.vue';
import ServiceBar from '../components/ServiceBar.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import $Api from '../api/index.js';
import { useRouter } from 'vue-router';
import NavFooter from '../components/NavFooter.vue'
import Message from '@/components/Message.vue'
export default {
  name: 'cart',
  components: {
    OrderHeader,
    ServiceBar,
    NavFooter,
    Message
  },
  setup(){
    let router = useRouter()
    //商品列表
    let list = ref([])
    //是否全选
    let allChecked = ref(false)
    //商品总金额
    let cartTotalPrices = ref(0)
    //选中商品数量
    let checkedNum = ref(0)


    //获取购物车列表
    const getCartList = async() => {
      try{

        loadList({
          method:'get',
          url: $Api.addCarts
        })

      }catch(e){
        console.log(e);
      }
    }


    //全选与非全选
    const toggleAll = async() => {
      let url =   allChecked.value ? $Api.unSelectAll : $Api.selectAll

      loadList({
        method:'put',
        url
      })

    }

    //接口封装
    const loadList = async(obj) => {
      const {
        cartProductVoList,
        selectedAll,
        cartTotalPrice,
      } = await axios({
        method:obj.method,
        url: obj.url
      })

      if(cartProductVoList.length > 0){
        list.value = cartProductVoList
        allChecked.value = selectedAll
        cartTotalPrices.value = cartTotalPrice
        checkedNum.value = list.value.filter(item => item.productSelected === true).length
      }else {
        list.value = []
        allChecked.value = false
        cartTotalPrices.value = 0
        checkedNum.value = 0
      }
    }

    const con = ref('')
    const types = ref('')
    const isShow = ref(false)
    
    const popFn = (str) => {
      con.value = str
      types.value = 'warn'
      isShow.value = true
      // alert('商品至少保留一件')
      setTimeout(() => {
        isShow.value = false
      },1000)
    }
    
    //更新商品数量
    const updateCart = async(item,type) => {
      let quantity = item.quantity,
          selected = item.productSelected
      if(type == '-'){
        if(quantity === 1){
          
          popFn('商品至少保留一件')
          return
        }
        quantity = --quantity
      }else if(type == '+'){
        if(quantity > item.productStock){
          popFn('购买商品数量不能超过库存数量')
          return
        }
        quantity = ++quantity
      }else {
        selected = !item.productSelected
      }



      const {
        cartProductVoList,
        selectedAll,
        cartTotalPrice,
      } = await axios({
        method:'put',
        url: `${$Api.addCarts}/${item.productId}`,
        data:{
          quantity,
          selected
        }
      })

      if(cartProductVoList.length > 0){
        list.value = cartProductVoList
        allChecked.value = selectedAll
        cartTotalPrices.value = cartTotalPrice
        checkedNum.value = list.value.filter(item => item.productSelected === true).length
      }else {
        list.value = []
        allChecked.value = false
        cartTotalPrices.value = 0
        checkedNum.value = 0
      }

    }


    //删除
    const delProduct = async(item) => {
      loadList({
        method:'delete',
        url: `${$Api.addCarts}/${item.productId}`
      })
    }

    //结算
    const order = () => {
      let isCheck = list.value.every(item => !item.productSelected)
      if(isCheck){
        popFn('请选择一件商品！')
      }else{
        router.push({
          path:'/Order/Confirm'
        })
      }
    }

    onMounted(() => {
      getCartList()
    })

    return {
      list,
      allChecked,
      cartTotalPrices,
      checkedNum,
      getCartList,
      toggleAll,
      updateCart,
      delProduct,
      order,
      con,
      types,
      isShow
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '../assets/scss/config.scss';
  @import '../assets/scss/mixin.scss';
  @import '../assets/scss/base.scss';
.cart {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 114px;
    .container{
      flex-direction: column;
      justify-content: flex-start;
    }
    .cart-box {
      width: 100%;
      background-color: #fff;
      font-size: $fontJ;
      color: #999999;
      text-align: center;
      .checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #e5e5e5;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;
        &.checked {
          background: url('/imgs/icon-gou.png') #ff6600 no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }
      .cart-item-head {
        display: flex;
        height: 79px;
        line-height: 79px;
        .col-1 {
          flex: 1;
        }
        .col-2 {
          flex: 2;
        }
        .col-3 {
          flex: 3;
        }
      }
      .cart-item-list {
        .cart-item {
          display: flex;
          align-items: center;
          height: 125px;
          border-top: 1px solid #e5e5e5;
          font-size: 16px;
          .item-check {
            flex: 1;
          }
          .item-name {
            flex: 3;
            font-size: 18px;
            color: #333333;
            display: flex;
            align-items: center;
            img {
              width: 80px;
              height: 80px;
              vertical-align: middle;
            }
            span {
              margin-left: 30px;
            }
          }
          .item-price {
            flex: 1;
            color: #333333;
          }
          .item-num {
            flex: 2;
            .num-box {
              display: inline-block;
              width: 150px;
              height: 40px;
              line-height: 40px;
              border: 1px solid #e5e5e5;
              font-size: 14px;
              a {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
              span {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
            }
          }
          .item-total {
            flex: 1;
            color: #ff6600;
          }
          .item-del {
            flex: 1;
            width: 14px;
            height: 12px;
            background: url('/imgs/icon-close.png') no-repeat center;
            background-size: contain;
            cursor: pointer;
          }
        }
      }
    }
    .order-wrap {
      width: 100%;
      font-size: $fontJ;
      color: #666666;
      margin-top: 20px;
      height: 50px;
      line-height: 50px;
      .cart-tip {
        margin-left: 29px;
        a {
          color: #666666;
          margin-right: 37px;
        }
        span {
          color: #ff6600;
          margin: 0 5px;
        }
      }
      .total {
        font-size: $fontJ;
        color: #ff6600;
        span {
          font-size: 24px;
        }
        a {
          width: 202px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          font-size: 18px;
          margin-left: 37px;
        }
      }
    }
  }
}
</style>
