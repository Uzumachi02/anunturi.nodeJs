<template>
  <div>

    <div class="section">
      <div class="container">
        <h1>Toate anunturile</h1>
      </div>
    </div>

    <div class="section white">
      <div class="container">
        <div class="row">
          <div class="col l2">
            <label for="sorting">Sortare</label>
            <select class="browser-default" id="sorting" v-model.number="filters.sorting">
              <option value="0">După dată (9-0)</option>
              <option value="1">După preț (9-0)</option>
              <option value="2">După vizionări (9-0)</option>
              <option value="3">După dată (0-9)</option>
              <option value="4">După preț (0-9)</option>
              <option value="5">După vizionări (0-9)</option>
            </select>
          </div>

          <div class="col l2">
            <label for="type">Tipul</label>
            <select class="browser-default" id="type" v-model.number="filters.type">
              <option value="0">Toate</option>
              <option v-for="opt in tipAnunt" :value="opt.id" v-text="opt.name"></option>
            </select>
          </div>

          <div class="col l2">
            <label for="category">Categoria</label>
            <select class="browser-default" id="category" v-model.number="filters.category">
              <option value="0">Toate</option>
              <option v-for="opt in catAnunt" :value="opt.id" v-text="opt.name"></option>
            </select>
          </div>

          <div class="input-field col l2">
            <input id="price_from" type="text" v-model.lazy="filters.price_from" />
            <label for="price_from" class="">Preț inceput</label>
          </div>

          <div class="input-field col l2">
            <input id="price_to" type="text" v-model.lazy="filters.price_to" />
            <label for="price_to" class="">Preț sfirsit</label>
          </div>

          <div v-if="isFilters" class="col l2">
            <a class="waves-effect waves-teal btn-flat reset-btn" @click="resetFilters">Resetare</a>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="container">
        <p class="countAnunt">Anunțuri găsite: {{ anunts.length }}</p>
        <div class="row">
          <div class="col l3 m4" v-for="anunt in anunts" :key="anunt.id">
            <nuxt-link class="card horzBlock__link" :to="{ name: 'anuntul-id', params: { id: anunt.id } }">
              <div class="card-image">
                <img :src="anunt.image" :alt="anunt.titlu">
                <span class="badge horzBlock__price" v-text="anunt.price + ' lei'"></span>
              </div>
              <div class="card-content">
                <p class="horzBlock__title" v-text="anunt.titlu"></p>
              </div>
              <div class="card-action">
                <span class="horzBlock__stat">
                  <i class="matIcon">access_time</i> {{ anunt.add_dt | normalizeDate }}
                </span>

                <span class="horzBlock__stat">
                  <i class="matIcon">remove_red_eye</i> {{ anunt.view }}
                </span>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~plugins/axios'

  export default {
    created() {
      this.getDatesForSelect()
    },
    data () {
      return {
        routQuery: this.$route.query,
        tipAnunt: [],
        catAnunt: [],
        filters: {
          sorting: 0,
          type: 0,
          category: 0,
          price_from: '',
          price_to: '',
          ...this.$route.query
        }
      }
    },
    async asyncData ({ query }) {
      let ress = await axios.get('/api/getanunturile', { params: query })
      return { anunts: ress.data.items }
    },
    head () {
      return {
        title: 'Anunturile'
      }
    },
    watch: {
      filters: {
        handler() {
          this.filterUpdate()
        },
        deep: true
      }
    },
    computed: {
      isFilters() {
        for(let key in this.routQuery) {
          return true
        }
        return false
      }
    },
    methods: {
      async getDatesForSelect() {
        try {
          let forFilter = await axios.get('/api/datesforadd')
          console.log(forFilter.data)
          this.tipAnunt = forFilter.data.tipAnunt
          this.catAnunt = forFilter.data.catAnunt
        } catch (err) { console.error(err) }
      },
      filterUpdate() {
        let query = {}
        let keys = Object.keys(this.filters)

        keys.forEach(key => {
          let item = this.filters[key]
          if( item )
            query[key] = item
        })
        this.$router.replace({ path: '/anunturile', query })
      },
      resetFilters() {
        this.$router.replace('/anunturile')
      }
    }
  }
</script>

<style lang="sass">
  @import '~assets/sass/smart-grid'

  .countAnunt
    margin-top: 0
    color: #999

  .reset-btn
    margin-top: 20px

  .horzBlock
    &__price
      position: absolute
      display: block
      background: #f44336
      color: #fff !important
      font-weight: 400
      border-radius: 2px
      bottom: 5px
      right: 5px

    &__link
      display: flex
      flex-direction: column
      color: inherit
      height: 100%
      margin: 0

      .card-action
        margin-top: auto

      &.em-more
        color: #444
        transition: box-shadow .25s, color .25s

        &:hover
          color: #111

        .card-content
          display: flex
          height: 100%
          align-items: center
          font-size: 38px
          font-weight: 700
          text-align: center
          justify-content: center

      &:hover
        box-shadow: 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.3)

        .horzBlock__title
          color: #c62828

    &__title
      font-weight: 600
      font-size: 18px
      transition: color .25s

    &__stat
      color: rgba(158, 158, 158, 0.6)
      font-size: 14px

      &:last-child
        float: right

</style>
