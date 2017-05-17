<template>
  <div class="section">
    <div class="container">
      <h2 class="center-align grey-text text-darken-3">Categorii de anunțuri</h2>

      <div class="categoryList">
        <div class="card horizontal categoryList__item" v-for="(cat, index) in categories" :key="index">
          <div v-if="cat.img" class="card-image categoryList__img" :style="{ backgroundImage: 'url(' + cat.img + ')' }">
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <p v-text="cat.name" class="categoryList__name"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//  import axios from '~plugins/axios'

  export default {
    data () {
      return {
        categories: [
          {
            id: 1,
            name: 'Automobile',
            img: 'http://media.caranddriver.com/images/media/51/2017-10best-lead-photo-672628-s-original.jpg'
          },
          {
            id: 2,
            name: 'Telefoane',
            img: 'http://onestogroup.com/wp-content/uploads/2015/08/mobile_phones.png'
          },
          {
            id: 3,
            name: 'Laptop-uri',
            img: 'https://qph.ec.quoracdn.net/main-qimg-86b41b6014de6ce0cd48b2e4f8238275'
          }
        ]
      }
    }
  }
</script>

<style lang="sass">
  @import '~assets/sass/smart-grid'

  .categoryList
    +row-flex
    justify-content: space-around

    &__item
      +col
      min-width: 150px

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
