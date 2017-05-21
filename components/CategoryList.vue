<template>
  <div class="section">
    <div class="container">
      <h2 class="center-align grey-text text-darken-3">Categorii de anunțuri</h2>

      <div class="categoryList">
        <nuxt-link :to="{ name: 'anunturile', query: { category: cat.id } }" class="card horizontal categoryList__item" v-for="(cat, index) in $store.state.catAnunt" :key="cat.id">
          <div v-if="cat.logo" class="card-image categoryList__img" :style="{ backgroundImage: 'url(' + cat.logo + ')' }">
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <p v-text="cat.name" class="categoryList__name"></p>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
  @import '~assets/sass/smart-grid'

  .categoryList
    +row-flex
    justify-content: space-around

    &__item
      +col
      min-width: 150px
      color: inherit

      &:hover
        color: #c62828
        box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.3)

    &__img
      width: 150px
      max-width: 150px !important
      height: 100px
      background-size: cover
      background-position-x: 50%
      background-position-y: 50%
      border-radius: 2px 0 0 2px

    &__name
      font-weight: 600
</style>
