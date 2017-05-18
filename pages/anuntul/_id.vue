<template>
  <div>
    <section class="container">
      <div class="anuntView__head">
        <h1 class="anuntView__title" v-text="anuntul.title"></h1>
        <p class="anuntView__price" v-text="anuntul.price"></p>
        <p class="anuntView__stat">
          <span><i class="matIcon">location_on</i> {{ anuntul.location }}</span>
          <span><i class="matIcon">access_time</i> {{ anuntul.dt_add }}</span>
          <span><i class="matIcon">remove_red_eye</i> {{ anuntul.view }}</span>
        </p>
      </div>

      <div class="row">
        <div class="col s9">
          <div class="card">
            <div class="card-image" v-if="anuntul.img[0]">
              <img :src="anuntul.img[0]">
            </div>
            <div class="card-content" v-html="getDescribe"></div>
          </div>
        </div>

        <div class="col s3">
          <div class="card">
            <div class="card-content">
              <p><i class="matIcon">person</i> Ivan Petrovi4</p>
              <p><i class="matIcon">phone</i> 078 55 884 55</p>
              <p><i class="matIcon">email</i> petrovi4@mail.ru</p>
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
  components: { horzBlocks },
  asyncData ({ params, error }) {
    console.log('est')
    console.log(params)
    return {
      anuntul: {
        title: 'Audi A8, 2012',
        price: '18 000 lei',
        location: 'Balți',
        img: [
          'http://s.auto.drom.ru/i24198/c/photos/fullsize/audi/a8/audi_a8_554776.jpg',
          'https://s.auto.drom.ru/i24205/pubs/4/49846/2525940.jpg',
          'https://s.auto.drom.ru/i24205/pubs/4/49846/2525944.jpg'
        ],
        describes: 'Lorem __ipsum__ dolor _sit amet_, consectetur adipisicing elit. Ab amet aspernatur assumenda dolore eveniet excepturi inventore, iusto optio porro quisquam, ratione rem repudiandae similique sint sit, sunt tenetur unde. Sint!',
        dt_add: '18.05.2017',
        view: 407
      }
    }
  },
  computed: {
    getDescribe() {
      return marked(this.anuntul.describes, { sanitize: true })
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

    &__stat
      margin: 0
      font-size: 1.4em
      color: rgba(0, 0, 0, 0.5)

      span
        margin-right: 50px

</style>
