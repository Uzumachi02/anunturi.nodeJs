<template>
  <div class="container">
    <div class="card authCard">
      <h1 class="authCard__title teal">Înregistrare</h1>
      <div class="card-content">
        <p class="authCard__info">
          Înregistrarea vă permite adăugarea, modificarea anunțurilor personale.
        </p>
        <form @submit.prevent="register">
          <div class="input-field">
            <input id="login" type="text" v-model="login" :class="{ invalid: validation.hasError('login'), valid: validation.isPassed('login') }" />
            <label for="login">Introduceți loginu</label>
            <span class="formError">{{ validation.firstError('login') }}</span>
          </div>

          <div class="input-field">
            <input id="password" type="password" v-model="password" :class="{ invalid: validation.hasError('password'), valid: validation.isPassed('password') }" />
            <label for="password">Introduceți parola</label>
            <span class="formError">{{ validation.firstError('password') }}</span>
          </div>

          <div class="input-field">
            <input id="password_rep" type="password" v-model="password_rep" :class="{ invalid: validation.hasError('password_rep'), valid: validation.isPassed('password_rep') }" />
            <label for="password_rep">Repetați parola</label>
            <span class="formError">{{ validation.firstError('password_rep') }}</span>
          </div>

          <p class="authCard__divider">Contactele</p>

          <div class="input-field">
            <input id="email" type="email" v-model="email" :class="{ invalid: validation.hasError('email'), valid: validation.isPassed('email') }" />
            <label for="email">Introduceți e-mailu</label>
            <span class="formError">{{ validation.firstError('email') }}</span>
          </div>

          <div class="input-field">
            <input id="phone" type="text" v-model="phone" :class="{ invalid: validation.hasError('phone'), valid: validation.isPassed('phone') }" />
            <label for="phone">Introduceți telefonul</label>
            <span class="formError">{{ validation.firstError('phone') }}</span>
          </div>

          <div class="input-field authCard__btn">
            <button type="submit" class="waves-effect waves-light btn">Înregistrare</button>
          </div>
        </form>
      </div>

      <div class="card-action">
        <div class="authCard__ps">
          Sunteți înregistrat? <nuxt-link to="/login">Logațivă</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Validator } from 'simple-vue-validator'
import axios from '~plugins/axios'

export default {
  data() {
    return {
      login: '',
      password: '',
      password_rep: '',
      email: '',
      phone: ''
    }
  },
  head () {
    return {
      title: 'Înregistrare'
    }
  },
  validators: {
    login(val) {
      return Validator.value(val).required().lengthBetween(4, 64)
    },
    password(val) {
      return Validator.value(val).required().lengthBetween(6, 32)
    },
    'password_rep, password': function (repeat, password) {
      if (this.validation.isTouched('password_rep')) {
        return Validator.value(repeat).required().match(password)
      }
    },
    email(val) {
      return Validator.value(val).required().email()
    },
    phone(val) {
      return Validator.value(val).required().integer().minLength(8)
    }
  },
  methods: {
    async register () {
      let validate = await this.$validate()
      if( validate ) {
        let params = {
          login: this.login,
          password: this.password,
          email: this.email,
          phone: this.phone
        }

        let reg = await axios.post('/api/register', params)
        if( reg.data.status === 'success' ) {
          Materialize.toast('Registrare succesă!', 4000)
          this.$router.push('/login')
        }
      }
    }
  }
}
</script>

<style lang="sass">
  .formError
    position: absolute
    left: 0
    color: #F44336
    bottom: 0
    transition: .2s opacity ease-out, .2s color ease-out
    font-size: .8rem

  .authCard
    width: 50%
    min-width: 320px
    margin: 10% auto 0

    &__divider
      margin-top: 30px!important
      font-weight: 500
      font-size: 16px
      color: #009688 !important

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
