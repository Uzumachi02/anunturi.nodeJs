<template>
  <div class="section horzBlocks" v-if="anunts.length > 0">
    <div class="container">
      <div class="horzBlocks__head">
        <h2 class="center-align grey-text text-darken-3" v-text="title"></h2>
        <div class="swiper-button-prev" :class="'btn-prev-' + rndId" slot="button-prev"></div>
        <div class="swiper-button-next" :class="'btn-next-' + rndId" slot="button-next"></div>
      </div>

      <div class="swiper-outer">
        <div v-swiper:horzBlocks="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="anunt in anunts" :key="anunt.id">
              <nuxt-link class="card horzBlock__link" :to="{ name: 'anuntul-id', params: { id: anunt.id } }">
                <div class="card-image">
                  <img :src="anunt.image" :alt="anunt.titlu">
                  <span class="badge horzBlock__price" v-text="anunt.price"></span>
                </div>
                <div class="card-content">
                  <p class="horzBlock__title" v-text="anunt.titlu"></p>
                </div>
                <div class="card-action">
                <span class="horzBlock__stat">
                  <i class="matIcon">access_time</i> {{ anunt.add_dt | normalizeDate }}
                </span>

                  <span class="horzBlock__stat">
                  <i class="matIcon">remove_red_eye</i> {{ anunt.view }}
                </span>
                </div>
              </nuxt-link>
            </div>
            <div v-if="more" class="swiper-slide">
              <nuxt-link class="card horzBlock__link em-more" to="/anunturile" v-pre>
                <div class="card-content">Altele...</div>
              </nuxt-link>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import NuxtLink from '../.nuxt/components/nuxt-link'
  import axios from '~plugins/axios'

  export default {
    props: {
      limit: {
        type: Number,
        default: 8
      },
      title: {
        type: String,
        default: 'Ultimele anunțuri'
      },
      type: {
        type: String,
        default: 'last'
      },
      more: {
        type: Boolean,
        default: true
      }
    },
    components: { NuxtLink },
    created() {
      this.rndId = Math.random().toString(36).substr(2, 5)
      this.swiperOption.nextButton = '.btn-next-' + this.rndId
      this.swiperOption.prevButton = '.btn-prev-' + this.rndId

      this.getAnunts()
    },
    data () {
      return {
        rndId: '',
        anunts: [],
        swiperOption: {
          slidesPerView: 4,
          spaceBetween: 30,
          breakpoints: {
            1200: {
              slidesPerView: 3
            },
            900: {
              slidesPerView: 2
            }
          }
        }
      }
    },
    methods: {
      async getAnunts() {
        try {
          const params = { limit: this.limit, type: this.type }
          const ress = await axios.get('/api/getanuntforhorzblock', { params } )
          this.anunts = ress.data.items
          console.log(this.anunts)
        } catch (err) {
          console.error(err)
        }
      }
    }
  }
</script>

<style lang="sass">
  @import '~assets/sass/smart-grid'

  .horzBlocks

    &__head
      position: relative

    .swiper-outer
      position: relative

    .swiper-button-prev
      left: 30px

    .swiper-button-next
      right: 30px

    .swiper-slide
      height: initial
      padding: 5px 5px 15px
      box-sizing: border-box

  .horzBlock
    &__price
      position: absolute
      display: block
      background: #f44336
      color: #fff !important
      font-weight: 400
      border-radius: 2px
      bottom: 5px
      right: 5px

    &__link
      display: flex
      flex-direction: column
      color: inherit
      height: 100%
      margin: 0

      .card-action
        margin-top: auto

      &.em-more
        color: #444
        transition: box-shadow .25s, color .25s

        &:hover
          color: #111

        .card-content
          display: flex
          height: 100%
          align-items: center
          font-size: 38px
          font-weight: 700
          text-align: center
          justify-content: center

      &:hover
        box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.3)

        .horzBlock__title
          color: #c62828

    &__title
      font-weight: 600
      font-size: 18px
      transition: color .25s

    &__stat
      color: rgba(158, 158, 158, 0.6)
      font-size: 14px

      &:last-child
        float: right

</style>
