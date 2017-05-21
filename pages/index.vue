<template>
  <div>
    <div class="section homeSection">
      <div class="container homeSection__content">
        <h1 class="homeSection__title">Anunturi pentru orce gust</h1>
      </div>
    </div>

    <category-list></category-list>

    <div class="divider"></div>

    <horz-blocks></horz-blocks>
    <div class="divider"></div>
    <horz-blocks title="Anunțurile populare" :more="false" type="vip"></horz-blocks>

  </div>


</template>

<script>
import CategoryList from '~components/CategoryList.vue'
import horzBlocks from '~components/horzBlocks.vue'
//  import axios from '~plugins/axios'

export default {
  components: {
    CategoryList,
    horzBlocks
  },
  head () {
    return {
      title: 'Users'
    }
  }
}
</script>

<style lang="sass">
  @import '~assets/sass/smart-grid'

  .homeSection
    height: 350px
    position: relative

    &:after
      background-image: url("/img/nightCity.jpg")
      filter: blur(1px)
      background-position-x: 50%
      background-position-y: 50%
      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0
      content: ''
      z-index: -1

    &__content
      color: #fff
      text-align: center

    &__title
      font-weight: 700
</style>
