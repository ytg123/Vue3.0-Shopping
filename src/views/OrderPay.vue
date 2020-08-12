<template>
  <div class="order-pay">
    <div class="wrapper">
          <div class="container">
            <div class="order-wrap">
              <div class="item-order">
                <div class="icon-succ"></div>
                <div class="order-info">
                  <h2>订单提交成功！去付款咯～</h2>
                  <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
                  <p>收货信息：{{addressInfo}}</p>
                </div>
                <div class="order-total">
                  <p>应付总额：<span>{{payments}}</span>元</p>
                  <p>订单详情<em class="icon-down" :class="{'up':showDetail}" @click="showDetail=!showDetail"></em></p>
                </div>
              </div>
              <div class="item-detail" v-if="showDetail">
                <div class="item">
                  <div class="detail-title">订单号：</div>
                  <div class="detail-info theme-color">{{orderId}}</div>
                </div>
                <div class="item">
                  <div class="detail-title">收货信息：</div>
                  <div class="detail-info">{{addressInfo}}</div>
                </div>
                <div class="item good">
                  <div class="detail-title">商品名称：</div>
                  <div class="detail-info">
                    <ul>
                      <li v-for="(item,index) in orderDetail" :key="index">
                        <img :src="item.productImage"/>{{item.productName}}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="item">
                  <div class="detail-title">发票信息：</div>
                  <div class="detail-info">电子发票 个人</div>
                </div>
              </div>
            </div>
            <div class="item-pay">
              <h3>选择以下支付方式付款</h3>
              <div class="pay-way">
                <p>支付平台</p>
                <div class="pay pay-ali" :class="{'checked':payType==1}" @click="paySubmit(1)"></div>
                <div class="pay pay-wechat" :class="{'checked':payType==2}" @click="paySubmit(2)"></div>
              </div>
            </div>
          </div>
        </div>
        <scan-pay-code v-if="showPay" @close="closePayModal" :img="payImg"></scan-pay-code>
        <modal
          title="支付确认"
          btnType="3"
          :showModal="showPayModal"
          sureText="查看订单"
          cancelText="未支付"
          @cancel="showPayModal=false"
          @submit="goOrderList"
        >
          <template v-slot:body>
            <p>您确认是否完成支付？</p>
          </template>
        </modal>
  </div>
</template>

<script>
  import Modal from '@/components/Modal.vue'
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import $Api from '../api/index.js'
  import { useRouter } from 'vue-router'
  import QRCode from 'qrcode'
  import ScanPayCode from '@/components/ScanPayCode.vue'
  export default {
    name:'order-pay',
    components:{
      Modal,
      ScanPayCode
    },
    setup(){

      const router = useRouter()

      const { currentRoute: {
        value:{
          query:{ orderNo }}}} = router

      //订单号
      const orderNumber = ref(orderNo)
      const addressInfo = ref('') //收货人地址
      const payments = ref('')
      const orderId = ref('')
      const showDetail = ref(false)
      const orderDetail = ref([])
      const getOrderDetail = async() => {
          const {
            orderItemVoList,
            payment,
            orderNo,
            shippingVo:{
              receiverName,
              receiverMobile,
              receiverProvince,
              receiverCity,
              receiverDistrict,
              receiverAddress
            }
          } = await axios({
            method:'get',
            url: `${$Api.orders}/${orderNumber.value}`
          })

          addressInfo.value = `
            ${receiverName} ${receiverMobile} ${receiverProvince} ${receiverCity} ${receiverDistrict} ${receiverAddress}
          `
          orderDetail.value = orderItemVoList
          payments.value = payment
          orderId.value = orderNo
      }

      //支付
      const payType = ref(0)
      const showPay = ref(false)
      const payImg = ref('')
      const paySubmit = async(num) => {
        payType.value = num
        if(num === 1){//支付宝
          window.open('/#/Order/Alipay?orderId=' + orderId.value,"_blank")
        }else if(num === 2){// 微信
          const {
            content
          } = await axios({
            method:'post',
            url: $Api.pay,
            data:{
              orderId: orderId.value,
              orderName:'Terry 仿小米商城',
              amount:0.01,
              payType: 2
            }
          })
          const payUrl = await QRCode.toDataURL(content)
          console.log(payUrl);
          payImg.value = payUrl
          showPay.value = true
          loopOrderState()
        }
      }

      const closePayModal = () => {
         showPay.value = false
         showPayModal.value = true
         clearInterval(timer.value)
      }

      //轮询查看是否支付成功
      const showPayModal = ref(false)

      const goOrderList = () => {
        showPayModal.value = false
        router.push({
          path:'/Order/List'
        })
      }

      const timer = ref(null)
      const loopOrderState = () => {
        timer.value = setInterval(async() => {
          const {
            status
          } = await axios({
            method:'get',
            url: $Api.orders + '/' + orderId.value,
          })

          if(status === 20){
            clearInterval(timer.value)
            goOrderList()
          }

        },1000)
      }

      onMounted(() => {
        getOrderDetail()
      })

      return {
        addressInfo,
        payments,
        orderId,
        showDetail,
        orderDetail,
        payType,
        paySubmit,
        showPayModal,
        goOrderList,
        showPay,
        closePayModal,
        payImg
      }
    }
  }
</script>

<style lang="scss" scoped>
.order-pay{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:61px;
      .container{
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        .order-wrap{
          width: 100%;
          padding: 62px 50px;
          background-color: #fff;
          font-size:14px;
          margin-bottom:30px;
          .item-order{
            width: 100%;
            display: flex;
            align-items: center;
            .icon-succ{
              width: 90px;
              height: 90px;
              border-radius: 50%;
              background:url('/imgs/icon-gou.png') #80c58a no-repeat center;
              background-size:60px;
              margin-right:40px;
            }
            .order-info{
              margin-right: 248px;
              h2{
                font-size:24px;
                color:#333333;
                margin-bottom:20px;
              }
              p{
                color:#666666;
                span{
                  color:#FF6700;
                }
              }
            }
            .order-total{
              &>p:first-child{
                margin-bottom:30px;
              }
              span{
                font-size:28px;
                color:#FF6700;
              }
              .icon-down{
                display:inline-block;
                width:14px;
                height:10px;
                background:url('/imgs/icon-down.png') no-repeat center;
                background-size:contain;
                margin-left:9px;
                transition:all .5s;
                cursor:pointer;
                &.up{
                  transform: rotate(180deg);
                }
              }
              .icon-up{
                transform: rotate(180deg);
              }
            }
          }
          .item-detail{
            border-top: 1px solid #D7D7D7;
            padding-top: 47px;
            padding-left: 130px;
            font-size: 14px;
            margin-top: 45px;
            .item{
              margin-bottom:19px;
              .detail-title{
                float:left;
                width:100px;
              }
              .detail-info{
                display:inline-block;
                img{
                  width: 30px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
        .item-pay{
          width: 100%;
          padding:26px 50px 72px;
          background-color:#ffffff;
          color: #333333;
          h3{
            font-size: 20px;
            font-weight: 200;
            color: #333333;
            padding-bottom: 24px;
            border-bottom: 1px solid #D7D7D7;
            margin-bottom: 26px;
          }
          .pay-way{
            font-size:18px;
            .pay{
              display:inline-block;
              width:188px;
              height:64px;
              border:1px solid #D7D7D7;
              cursor:pointer;
              &:last-child{
                margin-left:20px;
              }
              &.checked{
                border:1px solid #FF6700;
              }
            }
            .pay-ali{
              background:url('/imgs/pay/icon-ali.png') no-repeat center;
              background-size:103px 38px;
              margin-top:19px;
            }
            .pay-wechat{
              background:url('/imgs/pay/icon-wechat.png') no-repeat center;
              background-size:103px 38px;
            }
          }
        }
      }
    }
  }
</style>
