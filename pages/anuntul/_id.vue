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
          <span v-if="!anuntul.status" class="anuntView__hide">Ascuns</span>
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
              <p v-text="getUserName"></p>
              <p v-text="anuntul.email"></p>
              <p class="diller__phone" v-text="anuntul.phone"></p>
            </div>
          </div>

          <div v-if="isOwner" class="collection">
            <nuxt-link :to="{ name: 'anuntul-edit-id', params: { id: anuntul.id } }" class="collection-item">Modifică</nuxt-link>
            <a @click.prevent="toggleStatus" class="collection-item">{{ anuntul.status ? 'Ascunde' : 'Arată' }}</a>
            <a @click.prevent="remove" class="collection-item">Șterge</a>
          </div>
        </div>
      </div>

    </section>

    <horz-blocks title="Altete" :more="false" type="category" :catId="anuntul.cat_id"></horz-blocks>

  </div>
</template>

<script>
import axios from '~plugins/axios'
import horzBlocks from '~components/horzBlocks.vue'
import marked from 'marked'
import NuxtLink from '../../.nuxt/components/nuxt-link'

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
  components: {
    NuxtLink,
    horzBlocks },
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
    },
    isOwner() {
      if( this.$store.state.authUser.id ) {
        return this.$store.state.authUser.id === this.anuntul.user_id
      }
      return false
    },
    getUserName() {
      if( this.anuntul.f_name ) {
        if( this.anuntul.l_name )
          return this.anuntul.f_name + ' ' + this.anuntul.l_name
        return this.anuntul.f_name
      }
      return this.anuntul.login
    }
  },
  methods: {
    async toggleStatus() {
      try {
        const params = {status: this.anuntul.status ? 0 : 1}
        let res = await axios.get('/api/toggleStatus/' + this.anuntul.id, {params})
        if (res.data.status === 'success') {
          Materialize.toast('Succes', 4000)
          this.anuntul.status = res.data.item.status
        } else Materialize.toast(res.data.message, 4000)
      } catch (err) {
        console.error(err)
        Materialize.toast(err, 4000)
      }
    },
    async remove() {
      try {
        let res = await axios.get('/api/delanunt/' + this.anuntul.id)
        if (res.data.status === 'success') {
          Materialize.toast('Anunțul s-a șters', 4000)
          this.$router.push('/anunturile')
        } else Materialize.toast(res.data.message, 4000)
      } catch (err) {
        console.error(err)
        Materialize.toast(err, 4000)
      }
    }
  }
}
</script>

<style lang="sass">
  .collection-item
    cursor: pointer

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

    &__hide
      background: #f44336
      color: #fff
      font-size: 16px
      padding: 2px 10px
      border-radius: 2px

  .diller
    font-size: 1.2em

    &__phone
      font-size: 1.4em
      margin-top: 15px !important
      font-weight: 500

</style>
