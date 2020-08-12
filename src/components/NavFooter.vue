<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="../../public/imgs/logo-footer.png" alt="" />
      <p>Terry商城</p>
    </div>
    <div class="footer-link">
      <a href="">Terry shop</a>
    </div>
    <div class="copyright">
      Copyright &copy; <a href="http://www/365terry.top" target="_blank" class="domain">www.365terry.top</a> 版权所有
    </div>
  </div>
</template>

<script>
  export default {
    name:'navFooter'
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/config.scss';
  .footer{
    width: 100%;
    height: 233px;
    border-top: 4px solid $colorA;
    background-color: $colorB;
    color: $colorD;
    font-size: $fontI;
    text-align: center;
    .footer-logo{
      margin-top: 46px;
      margin-bottom: 31px;
      img{
        width: 53px;
        height: 36px;
        margin-bottom: 13px;
      }
    }
    .footer-link{
      a{
        color: $colorD;
        display: inline-block;
      }

    }
    .copyright{
      margin-top: 13px;
      .domain{
        color: $colorA;
      }
    }
  }
</style>
