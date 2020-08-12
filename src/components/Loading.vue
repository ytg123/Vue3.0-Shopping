<template>
  <div class="loading">
    <svg width="200" height="200" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="22" fill="none" stroke-width="3" stroke="#3be6cb" stroke-dasharray="34" stroke-linecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="2s" repeatCount="indefinite" />

        <animate attributeName="stroke" values="#3be6cb;#02bcfe;#3be6cb" dur="2s" repeatCount="indefinite"></animate>
      </circle>

      <circle cx="25" cy="25" r="12" fill="none" stroke-width="3" stroke="#02bcfe" stroke-dasharray="19" stroke-linecap="round">
        <animateTransform attributeName="transform" type="rotate" values="360 25 25;0 25 25" dur="2s" repeatCount="indefinite" />

        <animate attributeName="stroke" values="#02bcfe;#3be6cb;#02bcfe;" dur="2s" repeatCount="indefinite"></animate>
      </circle>
    </svg>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.loading {
  height: 530px;
  line-height: 530px;
  text-align: center;
  padding: 30px 0;
}
</style>
