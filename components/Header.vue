<template>
  <header>
    <nav class="white">
      <div class="nav-wrapper container">
        <nuxt-link id="logo-container" to="/" class="brand-logo">Anunturi.nodeJs</nuxt-link>

        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><nuxt-link to="/add">Adaugă</nuxt-link></li>
          <li class="navUser" v-if="$store.state.authUser.id">
            <nuxt-link :to="{ name: 'user-id', params: { id: $store.state.authUser.id } }" v-text="$store.state.authUser.login"></nuxt-link>
            <div class="navUser__drop">
              <a href="/logout" @click.prevent="logout" class="navUser__esit">Ieșire</a>
            </div>
          </li>
          <li v-else><nuxt-link to="/login">Logare</nuxt-link></li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
  import axios from 'axios'

  export default {
    methods: {
      async logout() {
        let ress = await axios.post('/api/logout')
        if( ress.data.status === 'success' ) {
          this.$store.commit('SET_USER', false)
          Materialize.toast('Ieșire succesă', 4000)
          if( window )
            window.location.href = this.$route.path
        }
      }
    }
  }
</script>

<style>
  nav .brand-logo {
    color: #444;
  }

  nav ul a {
    color: #444;
  }

  nav ul a.router-link-exact-active {
    background-color: rgba(0, 0, 0, 0.1);
  }
</style>

<style lang="sass">
  .navUser
    position: relative

    &:hover
      .navUser__drop
        display: block

    &__drop
      display: none
      text-align: center
      top: 63px
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)
      min-width: 100px
      background: #fff
      z-index: 9999
      position: absolute
</style>
