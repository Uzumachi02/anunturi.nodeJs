<template>
  <div>
    <my-header/>
    <nuxt/>
    <!--<my-footer/>-->
  </div>
</template>

<script>
import MyFooter from '~components/Footer.vue'
import MyHeader from '~components/Header.vue'

export default {
  created() {
    console.log('Create app')
    this.$store.dispatch('getCatAndTipAnunt')
  },
  components: {
    MyFooter,
    MyHeader
  }
}
</script>

<style>
  body {
    background: #f4f4f4;
  }
</style>
