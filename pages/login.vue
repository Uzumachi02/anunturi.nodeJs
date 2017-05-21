<template>
  <div class="container">
    <div class="card authCard">
      <h1 class="authCard__title teal">Logare</h1>

      <div class="card-content">
        <p class="authCard__info">
          Logarea vă permite adăugarea anunțurilor personale.
        </p>
        <form @submit.prevent="logare">
          <div class="input-field">
            <input id="login" v-model.lazy="login" type="text" class="validate" required minlength="4"/>
            <label for="login">Introduceți loginu</label>
          </div>

          <div class="input-field">
            <input id="password" v-model.lazy="password" type="password" class="validate" required minlength="6" />
            <label for="password">Introduceți parola</label>
          </div>

          <div class="input-field authCard__btn">
            <button type="submit" class="waves-effect waves-light btn">Logare</button>
          </div>
        </form>
      </div>

      <div class="card-action">
        <div class="authCard__ps">
          Nu sunteți înregistrați? <nuxt-link to="/register">Înregistrațivă</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from '~plugins/axios'

export default {
  middleware: 'notAuth',
  data() {
    return {
      login: '',
      password: ''
    }
  },
  head () {
    return {
      title: 'Logare'
    }
  },
  methods: {
    async logare () {
      try {
        let user = await this.$store.dispatch('login', {
          login: this.login,
          password: this.password
        })

        Materialize.toast('Logare succesă!', 4000)
        this.$router.push('/user/' + user.id)
      } catch (err) {
        console.error(err)
        Materialize.toast(err, 4000)
      }
    }
  }
}
</script>

<style lang="sass">
  .authCard
    width: 50%
    min-width: 320px
    margin: 10% auto 0

    &__title
      display: block
      margin: 0
      text-align: center
      font-size: 36px
      font-weight: 700
      color: #fff
      padding: 10px 15px

    &__info
      font-style: italic
      color: rgba(153, 153, 153, 0.5) !important
      font-size: 14px

    &__btn
      text-align: center

    &__ps
      font-style: italic
      color: rgba(153, 153, 153, 0.8) !important
      text-align: center
</style>
