<template>
  <div>
    <div class="section blue">
      <div class="container">
        <h1 class="white-text">Editarea profilului</h1>
      </div>
    </div>

    <div class="container">
      <div class="card">
        <div class="card-content">
          <form @submit.prevent="edit">
            <span class="card-title">FIO</span>
            <div class="row">
              <div class="col l4">
                <div class="input-field">
                  <input id="f_name" type="text" v-model.lazy="f_name" />
                  <label for="f_name" :class="{ active: f_name }">Numele</label>
                </div>
              </div>

              <div class="col l4">
                <div class="input-field">
                  <input id="l_name" type="text" v-model.lazy="l_name" />
                  <label for="l_name" :class="{ active: l_name }">Prenumele</label>
                </div>
              </div>

              <div class="col l4">
                <div class="input-field">
                  <input id="p_name" type="text" v-model.lazy="p_name" />
                  <label for="p_name" :class="{ active: p_name }">Patronimiul</label>
                </div>
              </div>
            </div>

            <span class="card-title">Contactele</span>
            <div class="input-field">
              <input id="email" type="email" v-model="email" :class="{ invalid: validation.hasError('email'), valid: validation.isPassed('email') }" />
              <label for="email" :class="{ active: email }">E-mailu</label>
              <span class="formError">{{ validation.firstError('email') }}</span>
            </div>

            <div class="input-field">
              <input @change="addPhone" id="phone" type="text" :class="{ invalid: validation.hasError('phones'), valid: validation.isPassed('phones') }" :disabled="phones.length == 5" />
              <label for="phone">Introduceți telefonul</label>
              <span class="formError">{{ validation.firstError('phones') }}</span>
            </div>

            <ul class="addPhone browser-default" v-if="phones.length > 0">
              <li class="addPhone__item" v-for="(ph, index) in phones" :key="index">
                {{ ph }}
                <a class="btn-floating waves-effect waves-light red addPhone__remove"
                   @click.prevent="removePhone(index)"
                   title="Șterge numărul"
                >&times;</a>
              </li>
            </ul>

            <div class="input-field editCard__btn">
              <button type="submit" class="waves-effect waves-light btn blue">Editare</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Validator } from 'simple-vue-validator'
import axios from '~plugins/axios'

export default {
  middleware: 'isOwnerProfile',
  data() {
    return {
      f_name: '',
      l_name: '',
      p_name: '',
      email: '',
      phones: [],
      isPhoneEdit: false
    }
  },
  async asyncData({ params, error }) {
    try {
      let ress = await axios.get('/api/getuser/' + params.id)
      if( ress.data.status !== 'success' )
        throw 'User not found'

      let user = ress.data.item
      user.phones = user.phones.map(item => item.number)
      return user
    } catch (err) {
      error({ statusCode: 404, message: err })
    }
  },
  head () {
    return {
      title: 'Editarea profilului'
    }
  },
  validators: {
    email(val) {
      return Validator.value(val).required().email()
    },
    phones(val) {
      return Validator.value(val).required().minLength(1)
    }
  },
  methods: {
    async edit () {
      let validate = await this.$validate()
      if( validate ) {
        let params = {
          id: this.id,
          f_name: this.f_name,
          l_name: this.l_name,
          p_name: this.p_name,
          email: this.email,
          phones: this.phones,
          isPhoneEdit: this.isPhoneEdit || false
        }

        let reg = await axios.post('/api/user/edit', params)
        if( reg.data.status === 'success' ) {
          Materialize.toast('Editare succesă!', 4000)
          this.$router.push('/user/' + this.id )
        } else Materialize.toast(reg.data.message, 4000)
      }
    },
    addPhone(e) {
      if( e.target.value && this.phones.length <= 5 ) {
        this.isPhoneEdit = true
        this.phones.push(e.target.value)
        e.target.value = ''
      }
      console.log(e.target.value)
    },
    removePhone(index) {
      this.isPhoneEdit = true
      let findIndex = this.phones.findIndex((el, ind) => ind === index)

      if( findIndex > -1 ) {
        this.phones.splice(findIndex, 1)
      }
    },
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

  .addPhone
    padding-left: 15px

    &__remove
      margin-left: 15px
      width: 20px
      height: 20px
      line-height: 20px
      font-size: 12px
      text-align: center

  .editCard__btn
    text-align: center
    margin-top: 30px
</style>
