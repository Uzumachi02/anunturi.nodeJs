<template>
  <header>
    <nav class="white">
      <div class="nav-wrapper container">
        <nuxt-link id="logo-container" to="/" class="brand-logo">Anunturi.nodeJs</nuxt-link>

        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><nuxt-link to="/add">Adaugă</nuxt-link></li>
          <li v-if="$store.state.authUser.id"><a href="#" v-text="$store.state.authUser.login"></a></li>
          <li v-else><nuxt-link to="/login">Logare</nuxt-link></li>
        </ul>
      </div>
    </nav>
  </header>
</template>

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
