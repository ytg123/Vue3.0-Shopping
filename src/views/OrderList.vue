<template>
  <div class="order-list">
     <div class="wrapper">
          <div class="container">
            <div class="order-box">
              <loading v-if="loading"></loading>
              <div class="order" v-for="(order,index) in olist" :key="index">
                <div class="order-title">
                  <div class="item-info fl">
                    {{order.createTime}}
                    <span>|</span>
                    {{order.receiverName}}
                    <span>|</span>
                    订单号：{{order.orderNo}}
                    <span>|</span>
                    {{order.paymentTypeDesc}}
                  </div>
                  <div class="item-money fr">
                    <span>应付金额：</span>
                    <span class="money">{{order.payment}}</span>
                    <span>元</span>
                  </div>
                </div>
                <div class="order-content clearfix">
                  <div class="good-box fl">
                    <div class="good-list" v-for="(item,i) in order.orderItemVoList" :key="i">
                      <div class="good-img">
                        <img :src="item.productImage" alt="">
                      </div>
                      <div class="good-name">
                        <div class="p-name">{{item.productName}}</div>
                        <div class="p-money">{{item.totalPrice + 'X' + item.quantity}}元</div>
                      </div>
                    </div>
                  </div>
                  <div class="good-state fr" v-if="order.status == 20">
                    <a href="javascript:;">{{order.statusDesc}}</a>
                  </div>
                  <div class="good-state fr" v-else>
                    <a href="javascript:;" @click="_goPay(order.orderNo)">{{order.statusDesc}}</a>
                  </div>
                </div>
              </div>
              <div class="load-more" v-if="(!loading && olist.length > 0) && !isButton">
                  <button class="btn btn-default btn-large" @click="loadMore">加载更多</button>
              </div>
              <div class="load-more under-line" v-if="isButton">
                  亲，我也是有底线的！
              </div>
              <!-- <el-pagination
                v-if="true"
                class="pagination"
                background
                layout="prev, pager, next"
                :pageSize="pageSize"
                :total="total"
                @current-change="handleChange"
                >
              </el-pagination>

              <div class="scroll-more"
                v-infinite-scroll="scrollMore"
                infinite-scroll-disabled="true"
                infinite-scroll-distance="410"
                v-if="false"
              >
                <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading">
              </div> -->
              <no-data v-if="!loading && olist.length==0"></no-data>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import $Api from '../api/index.js';
  import { useRouter } from 'vue-router';
   import Loading from '@/components/Loading.vue'
   import NoData from '@/components/NoData.vue'
   
  export default {
    name:'order-list',
    components:{
      Loading,
      NoData
    },
    setup(){

      const olist = ref([])
      const loading = ref(false)
      const router = useRouter()
      const pageNumber = ref(1)
      const totalNum = ref(0)
      const isButton = ref(false)
      const getOrderList = async() => {
        try{
          loading.value = true
          const {
            list,
            total
          } = await axios({
            method: 'get',
            url: $Api.orders,
            params:{
              pageSize:10,
              pageNum: pageNumber.value
            }
          })
          list.forEach((item) => {
            olist.value.push(item)
          })
          totalNum.value = total
          loading.value = false
        }catch(e){
          console.log(e);
        }
      }

      const _goPay = (orderNo) => {
        router.push({
          path:'/Order/Pay',
          query:{
            orderNo: orderNo
          }
        })
      }

      const loadMore = () => {
        ++pageNumber.value
        if(!(pageNumber.value >  Math.ceil(totalNum.value/10))){
          isButton.value = false
          getOrderList()
        }else{
          isButton.value = true
        }
      }

      onMounted(() => {
        getOrderList()
      })

      return {
        olist,
        _goPay,
        loading,
        loadMore,
        isButton
      }

    }
  }
</script>

<style lang="scss" scoped>
@import '@/assets/scss/config.scss';
  @import '@/assets/scss/mixin.scss';
  @import '@/assets/scss/button.scss';
  .order-list{
    .wrapper{
      background-color:$colorJ;
      padding-top:23px;
      padding-bottom:110px;
      .order-box{
          width: 100%;
        .order{
          @include border();
          background-color:$colorG;
          margin-bottom:31px;
          &:last-child{
            margin-bottom:0;
          }
          .order-title{
            @include height(74px);
            background-color:$colorK;
            padding:0 43px;
            font-size:16px;
            color:$colorC;
            .item-info{
              span{
                margin:0 9px;
              }
            }
            .money{
              font-size:26px;
              color:$colorB;
            }
          }
          .order-content{
            padding:0 43px;
            .good-box{
              width:88%;
              .good-list{
                display: flex;
                align-items: center;
                height:145px;
                .good-img{
                  width:112px;
                  img{
                    width:100%;
                  }
                }
                .good-name{
                  font-size:20px;
                  color:$colorB;
                }
              }
            }
            .good-state{
              @include height(145px);
              font-size: 20px;
              color:$colorA;
              a{
                color:$colorA;
              }
            }
          }
        }
        .pagination{
          text-align:right;
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active{
          background-color: #FF6600;
        }
        .el-button--primary{
          background-color: #FF6600;
          border-color: #FF6600;
        }
        .load-more,.scroll-more{
          text-align:center;
        }
        .under-line{
          width: 100%;
          @include height(60px);
        }
      }
    }
  }
</style>
