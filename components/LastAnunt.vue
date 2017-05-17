<template>
  <div class="section">
    <div class="container">
      <h2 class="center-align grey-text text-darken-3">Ultimele anunțuri</h2>

      <div class="row">
        <div class="col s4 xl3" v-for="n in limit">
          <nuxt-link class="card lastAnunt__link" to="/">
            <div class="card-image">
              <img :src="anunt[0].img" :alt="anunt[0].titlu">
              <span class="badge lastAnunt__price" v-text="anunt[0].price"></span>
            </div>
            <div class="card-content">
              <p class="lastAnunt__title" v-text="anunt[0].titlu"></p>
            </div>
            <div class="card-action">
              <span class="lastAnunt__stat">
                <i class="matIcon">access_time</i> 17.05.2017
              </span>

              <span class="lastAnunt__stat">
                <i class="matIcon">remove_red_eye</i> {{ n + 10 }}
              </span>
            </div>
          </nuxt-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import NuxtLink from '../.nuxt/components/nuxt-link'
//  import axios from '~plugins/axios'

  export default {
    props: {
      limit: {
        type: Number,
        default: 8
      }
    },
    components: {NuxtLink},
    data () {
      return {
        anunt: [
          {
            id: 1,
            titlu: 'Audi A8, 2012',
            img: 'http://s.auto.drom.ru/i24198/c/photos/fullsize/audi/a8/audi_a8_554776.jpg',
            price: '19 000 lei'
          }
        ]
      }
    }
  }
</script>

<style lang="sass">
  @import '~assets/sass/smart-grid'

  .lastAnunt
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
      display: block
      color: inherit

      &:hover
        box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.3)

        .lastAnunt__title
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
