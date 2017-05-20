<template>
  <div>
    <section class="container">
      <div class="anuntView__head">
        <div class="row">
          <div class="col l9 m9">
            <h1 class="anuntView__title" v-text="anuntul.titlu"></h1>
          </div>
          <div class="col l3 m3">
            <p class="anuntView__price" v-text="anuntul.price + ' lei'"></p>
          </div>
        </div>

        <p class="anuntView__stat">
          <span><i class="matIcon">location_on</i> {{ anuntul.location }}</span>
          <span><i class="matIcon">access_time</i> {{ anuntul.add_dt | normalizeDate }}</span>
          <span><i class="matIcon">remove_red_eye</i> {{ anuntul.view }}</span>
        </p>
      </div>

      <div class="row">
        <div class="col l9">
          <div class="card">
            <div class="card-image" v-if="anuntul.images" :key="anuntul.id">
              <div id="fotorama">
                <img v-for="img in anuntul.images" :src="img.url">
              </div>
            </div>
            <div class="card-content" v-html="getDescribe"></div>
          </div>
        </div>

        <div class="col l3">
          <div class="card diller">
            <div class="card-content">
              <p><strong>Vinzatorul</strong></p>
              <p><i class="matIcon">person</i> Ionel</p>
              <p><i class="matIcon">email</i> petrovi4@mail.ru</p>
              <p class="diller__phone"><i class="matIcon">phone</i> 078 55 884 55</p>
            </div>
          </div>

          <div class="collection">
            <a href="#!" class="collection-item">Modifică</a>
            <a href="#!" class="collection-item">Ascunde</a>
            <a href="#!" class="collection-item">Șterge</a>
          </div>
        </div>
      </div>

    </section>

    <horz-blocks title="Anunțuri asemănătoare" :more="false"></horz-blocks>

  </div>
</template>

<script>
import axios from '~plugins/axios'
import horzBlocks from '~components/horzBlocks.vue'
import marked from 'marked'

export default {
  mounted() {
    console.log('mounted')
    setTimeout(() => {
      $('#fotorama').fotorama({
        allowfullscreen: true,
        nav: 'thumbs'
      })
    }, 100)
  },
  updated() {
    console.log('updated')
    setTimeout(() => {
      $('#fotorama').fotorama({
        allowfullscreen: true,
        nav: 'thumbs'
      })
    }, 100)
  },
  components: { horzBlocks },
  async asyncData ({ params, error }) {
    try {
      await axios.get('/api/addview/' + params.id)
      const ress = await axios.get('/api/getanunt/' + params.id)
      if( ress.data.status === 'failure' )
        throw ress.data.message

      console.log(ress.data)

      return {
        anuntul: ress.data.item
      }
    } catch (err) {
      error({ statusCode: 404, message: err })
    }

  },
  head () {
    return {
      title: 'Audi A8, 2012',
      link: [
        { rel: 'stylesheet', type: 'text/css', href: '/libs/fotorama-4.6.4/fotorama.css' }
      ],
      script: [
        { src: '/libs/fotorama-4.6.4/fotorama.js' }
      ]
    }
  },
  computed: {
    getDescribe() {
      return marked(this.anuntul.describe, { sanitize: true })
    }
  }
}
</script>

<style lang="sass">
  .anuntView
    &__head
      margin-top: 30px
      margin-bottom: 20px

    &__title, &__price
      margin: 0
      font-weight: 600

    &__price
      color: #f44336
      font-size: 2.6em
      text-align: right
      line-height: 69px

    &__stat
      margin: 0
      font-size: 1.4em
      color: rgba(0, 0, 0, 0.5)

      span
        margin-right: 50px

  .diller
    font-size: 1.2em

    &__phone
      font-size: 1.4em
      margin-top: 15px !important
      font-weight: 500

</style>
