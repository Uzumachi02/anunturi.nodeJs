<template>
  <div class="section">
    <div class="container">
      <div class="card userCard">
        <div class="userCard__head">
          <h1 class="userCard__title">Profilu: {{ user.login }}</h1>
        </div>

        <div class="card-content">
          <div class="userCard__block">
            <div class="userCard__item">
              <h4>FIO</h4>
              <div class="row">
                <div class="col">Numele:</div>
                <div class="col" v-html="setNot(user.f_name)"></div>
              </div>

              <div class="row">
                <div class="col">Prenumele:</div>
                <div class="col" v-html="setNot(user.l_name)"></div>
              </div>

              <div class="row">
                <div class="col">Patronimiu:</div>
                <div class="col" v-html="setNot(user.p_name)"></div>
              </div>
            </div>

            <div class="userCard__item">
              <h4>Contacte</h4>
              <div class="row">
                <div class="col">Email:</div>
                <div class="col" v-html="setNot(user.email)"></div>
              </div>

              <h5>Telefoanele</h5>
              <p v-for="tel in user.phones" v-text="tel.number"></p>
            </div>

            <div class="userCard__item">
              <h4>Informatie</h4>
              <div class="row">
                <div class="col">Online:</div>
                <div class="col">{{ user.online_dt | normalizeDate }}</div>
              </div>

              <div class="row">
                <div class="col">Înregistrarea:</div>
                <div class="col">{{ user.reg_dt | normalizeDate }}</div>
              </div>
            </div>
          </div>

          <p v-if="isOwner">
            <nuxt-link class="brown lighten-2 waves-effect waves-light btn" :to="{ name: 'user-edit-id', params: { id: user.id } }">Editarea profilului</nuxt-link>
          </p>
        </div>
      </div>

      <horz-blocks title="Anunțurile adăugate" type="user" :userId="user.id" :more="false"></horz-blocks>
    </div>
  </div>
</template>

<script>
import axios from '~plugins/axios'
import horzBlocks from '~components/horzBlocks.vue'
import marked from 'marked'
import NuxtLink from '../../.nuxt/components/nuxt-link'

export default {
  components: {
    NuxtLink,
    horzBlocks
  },
  async asyncData ({ params, error }) {
    try {
      let ress = await axios.get('/api/getuser/' + params.id)
      if (ress.data.status === 'success') {
        return { user: ress.data.item }
      } else throw ress.data.message
    } catch (err) {
      error({ statusCode: 404, message: err })
    }
  },
  head () {
    return {
      title: 'Profilu lui ' + this.user.login
    }
  },
  computed: {
    isOwner() {
      return this.$store.state.authUser.id === this.user.id
    }
  },
  methods: {
    setNot(val) {
      return val || '<em>nui specificat</em>'
    }
  }
}
</script>

<style lang="sass">
  @import '~assets/sass/smart-grid'

  .userCard
    &__head
      background: #2196f3
      padding: 24px
      color: #fff
      text-transform: capitalize

    &__title
      margin: 0
      font-size: 36px

    &__block
      +row-flex

    &__item
      +col
      +col-4
      +col-md-6
      +col-sm-12
      margin-bottom: 30px
</style>
