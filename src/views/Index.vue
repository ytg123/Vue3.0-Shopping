<template>
  <div class="index">
    <div class="container">
      <div class="nav-menu">
        <ul class="menu-wrap">
          <li class="menu-item">
            <a href="javascript:;">手机 电话卡</a>
            <div class="children">
              <ul v-for="(item, idx) in menuList" :key="'out' + idx">
                <li v-for="(sub, idex) in item" :key="'in' + idex">
                  <a @click="_toProduct(sub.id)">
                    <img :src="sub.img === 1 ? '/imgs/item-box-1.png' : sub.img" alt="" />
                    {{ sub.name === 1 ? '小米9' : sub.name }}
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="swiper-box">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, idx) in sliderList" :key="'slide' + idx">
              <a @click="_toProduct(item.id)"><img :src="item.src" alt="phone" /></a>
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
      <div class="ads-box">
        <a @click="_toProduct(item.id)" v-for="(item, idx) in adsList" :key="'ads' + idx"><img :src="item.img" alt="" /></a>
      </div>
      <div class="banner">
        <a @click="_toProduct(30)"><img src="/imgs/banner-1.png" alt="" /></a>
      </div>
    </div>
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a @click="_toProduct(40)"><img src="/imgs/mix-alpha.jpg" alt="" /></a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr, indx) in phoneList" :key="'phone' + indx">
              <div class="item" v-for="(aitem, index) in arr" :key="'phitem' + index">
                <span :class="{'new-pro': index%2 ===0}">新品</span>
                <img :src="aitem.mainImage" alt="" />
                <div class="item-info">
                  <h3>{{aitem.name}}</h3>
                  <p>{{aitem.subtitle}}</p>
                  <p class="price" @click="_addCarts(aitem.id)">{{aitem.price}}元</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--
      title="提示"
      sureText="查看详情"
      btnType="3"
      modalType="middle"
      :showModal="isShowModal"
      @submit="_submit"
      @cancel="isShowModal = false"


    -->
    <modal
      title="提示"
      sureText="查看详情"
      btnType="1"
      modalType="middle"
      :showModal="isShowModal"
      @submit="_submit"
      @cancel="isShowModal = false"
    >
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>

    </modal>
    <service-bar></service-bar>
  </div>
</template>

<script>
import ServiceBar from '@/components/ServiceBar.vue';
import Modal from '../components/Modal.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import $Api from '../api/index.js';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
export default {
  name: 'Index',
  components: {
    ServiceBar,
    Modal
  },
  setup() {
    const sliderList = ref([
      {
        id: 47,
        src: require('../../public/imgs/slider/slide-1.jpg')
      },
      {
        id: 48,
        src: require('../../public/imgs/slider/slide-2.jpg')
      },
      {
        id: 49,
        src: require('../../public/imgs/slider/slide-3.jpg')
      },
      {
        id: 450,
        src: require('../../public/imgs/slider/slide-4.jpg')
      }
    ]);

    const menuList = ref([
      [
        {
          id: 30,
          img: '/imgs/item-box-1.png',
          name: '小米CC9'
        },
        {
          id: 31,
          img: '/imgs/item-box-2.png',
          name: '小米8青春版'
        },
        {
          id: 32,
          img: '/imgs/item-box-3.jpg',
          name: 'Redmi K20 Pro'
        },
        {
          id: 33,
          img: '/imgs/item-box-4.jpg ',
          name: '移动4G专区'
        }
      ],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1]
    ]);

    const adsList = ref([
      {
        id: 33,
        img: '/imgs/ads/ads-1.png'
      },
      {
        id: 48,
        img: '/imgs/ads/ads-2.jpg'
      },
      {
        id: 45,
        img: '/imgs/ads/ads-3.png'
      },
      {
        id: 47,
        img: '/imgs/ads/ads-4.jpg'
      }
    ]);

    const phoneList = ref([]);

    const isShowModal = ref(false)

    const getProduct = async () => {
      const {
        list
      } = await axios({
        method:'get',
        url:$Api.getProduct,
        params:{
          categoryId:'100012',
          pageSize:8
        }
      })
      if(list.length === 0){
        phoneList.value = []
      }else{
        phoneList.value = [list.slice(0,4),list.slice(4,8)]
      }
    }

    const swiperFn = () => {
      new window.Swiper('.swiper-container', {
        direction: 'horizontal', // vertical 垂直切换选项
        loop: true, // 循环模式选项
        autoplay: true, //自动播放
        effect: 'cube',
        cubeEffect: {
          shadowOffset: 0,
          shadowScale: 0.6
        },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      });
    };
    const store = useStore()
    const _addCarts = async (id) => {
      console.log(id);
      try{

        const {
          cartProductVoList
        } = await axios({
          method:'post',
          url:$Api.addCarts,
          data:{
            productId:id,
            selected:true
          }
        })
        store.dispatch('setCartSum',cartProductVoList.length)
        isShowModal.value = true
      }catch(e){
        console.log(e);
      }
    }
    const router = useRouter()
    const _submit = () => {
      isShowModal.value = false
      router.push({
        path:'/Cart'
      })
    }

    
    //去往商品详情页面
    const _toProduct = (val) => {
      router.push({
        path: `/Product/${val}`
      })
    }

    onMounted(() => {
      //轮播
      swiperFn()
      //手机商品
      getProduct()
    });

    return {
      sliderList,
      menuList,
      adsList,
      phoneList,
      isShowModal,
      swiperFn,
      getProduct,
      _addCarts,
      _submit,
      _toProduct
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/config.scss';
@import '../assets/scss/mixin.scss';
@import '../assets/scss/base.scss';
.index {
  flex-direction: column;
  @include flex(flex-start, center) .container {
    position: relative;
    height: auto;
    flex-direction: column;
    .nav-menu {
      position: absolute;
      width: 264px;
      height: 451px;
      top: 0;
      left: 0;
      z-index: 9;
      padding: 26px 0;
      box-sizing: border-box;
      background-color: #55585a7a;
      .menu-wrap {
        .menu-item {
          height: 50px;
          line-height: 50px;
          a {
            width: 100%;
            display: inline-block;
            font-size: $fontI;
            color: $colorG;
            padding-left: 30px;
            box-sizing: border-box;
            position: relative;
            &:after {
              position: absolute;
              right: 30px;
              top: 17px;
              content: '';
              @include bgImg(10px, 15px, '../../public/imgs/icon-arrow.png');
            }
          }
          &:hover {
            background-color: $colorA;
            .children {
              display: block;
            }
          }
          .children {
            display: none;
            position: absolute;
            top: 0;
            left: 264px;
            border: 1px solid $colorH;
            width: 962px;
            height: 449px;
            background-color: $colorG;
            ul {
              @include flex() height: 75px;
              li {
                height: 100%;
                line-height: 75px;
                width: 241px;
                padding-left: 23px;
                box-sizing: border-box;
              }
              a {
                color: $colorB;
                font-size: $fontJ;
              }
              img {
                width: 42px;
                height: 35px;
                vertical-align: middle;
                margin-right: 15px;
              }
            }
          }
        }
      }
    }
    .swiper-box {
      width: 100%;
      height: 451px;
      .swiper-container {
        height: 100%;
        overflow: hidden;
        img {
          width: 100%;
        }
        .swiper-button-prev {
          left: 274px;
        }
      }
    }
    .ads-box {
      @include flex();
      margin-top: 14px;
      margin-bottom: 31px;
      width: 100%;
      a {
        display: inline-block;
        width: 296px;
        height: 167px;
      }
    }
    .banner {
      margin-bottom: 50px;
      width: 100%;
      height: 100px;
      a {
        width: 100%;
        height: 100px;
        display: inline-block;
      }
    }
  }
  .product-box {
    width: 100%;
    background-color: $colorJ;
    padding-top: 30px;
    padding-bottom: 50px;
    box-sizing: border-box;
    .container {
      margin: auto;

      h2 {
        color: $colorB;
        font-size: $fontF;
        height: 21px;
        line-height: 21px;
        margin-bottom: 20px;
        width: 100%;
      }
      .wrapper {
        width: 100%;
        @include flex(flex-start, flex-start);
        .banner-left {
          margin-right: 16px;
          width: 224px;
          height: 619px;
          a {
            display: inline-block;
            width: 100%;
            height: 100%;
            img {
              display: inline-block;
              width: 224px;
              height: 619px;
            }
          }
        }
        .list-box {
          flex: 1;
          .list {
            @include flex();
            width: 100%;
            margin-bottom: 14px;
            &:last-child {
              margin-bottom: 0;
            }
            .item {
              width: 236px;
              height: 302px;
              background-color: $colorG;
              @include flex(center, center);
              flex-direction: column;
              span {
                display: inline-block;
                width: 67px;
                height: 24px;
                font-size: $fontJ;
                color: $colorG;
                line-height: 24px;
                text-align: center;
                &.new-pro{
                  background-color: #7ecf68;
                }
                &.kill-pro{
                  background-color: #e82626;
                }
              }
              img {
                height: 195px;
                transform: scale(.8);
              }
              .item-info {
                h3 {
                  font-size: $fontJ;
                  color: $colorB;
                  line-height: $fontJ;
                  font-weight: bold;
                  text-align: center;
                }
                p {
                  color: $colorD;
                  line-height: 13px;
                  margin: 6px auto 13px;
                  text-align: center;
                }
                .price {
                  color: #f20a0a;
                  font-size: $fontJ;
                  font-weight: bold;
                  cursor: pointer;
                  &:after {
                    content: '';
                    margin-left: 5px;
                    vertical-align: middle;
                    @include bgImg(22px, 22px, '/imgs/icon-cart-hover.png');
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
