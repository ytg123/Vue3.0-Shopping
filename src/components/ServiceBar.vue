<template>
  <div class="service-bar">
    <div class="container">
      <ul>
        <li v-for="(item, index) in serviceArr" :key="'service' + index">
            <span :class="[classArr[index]]" ></span>
            {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'service-bar',
  setup() {
    const serviceArr = ref(['预约维修服务', '7天无理由退货', '15天免费换货', '满150包邮']);
    const classArr = ref(['icon-setting', 'icon-7day', 'icon-15day', 'icon-post']);
    return {
      serviceArr,
      classArr
    };
  }
};
</script>

<style lang="scss">
@import '../assets/scss/config.scss';
@import '../assets/scss/mixin.scss';
@import '../assets/scss/base.scss';
.service-bar {
  padding: 33px 0;
  color: $colorC;
  font-size: $fontI;
  @include flex(center,center)
  ul{
    width:100%;
    li {
      display: inline-block;
      width: 24.8%;
      text-align: center;
      border-right: 1px solid $colorH;
      span {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-right: 8px;
      }
      &:last-child{
        border-right: none;
      }
      .icon-setting {
        @include bgImg(20px, 20px, '../../public/imgs/icon-setting.png');
      }
      .icon-7day {
        @include bgImg(20px, 20px, '../../public/imgs/icon-7day.png');
      }
      .icon-15day {
        @include bgImg(20px, 20px, '../../public/imgs/icon-15day.png');
      }
      .icon-post {
        @include bgImg(20px, 20px, '../../public/imgs/icon-post.png');
      }
    }
  }
}
</style>
