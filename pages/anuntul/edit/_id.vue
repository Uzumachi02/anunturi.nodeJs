<template>
  <div>
    <div class="section teal">
      <div class="container">
        <h1 class="white-text">Editarea anunțului</h1>
      </div>
    </div>
    <section class="container">
      <div class="card">
        <div class="card-content">
          <form action="" class="" @submit.prevent="save">
            <span class="card-title">Setările anunțului</span>
            <div class="row">
              <div class="col s6">
                <label>Tipul anunțului</label>
                <select class="browser-default" v-model.number="formDates.tip_id">
                  <option value="" disabled selected>Selectați tipul</option>
                  <option v-for="tip in $store.state.tipAnunt" :value="tip.id" :key="tip.id" v-text="tip.name"></option>
                </select>
              </div>

              <div class="col s6">
                <label>Categoria anunțului</label>
                <select class="browser-default" v-model.number="formDates.cat_id">
                  <option value="" disabled selected>Selecțari categoria</option>
                  <option v-for="cat in $store.state.catAnunt" :value="cat.id" :key="cat.id" v-text="cat.name"></option>
                </select>
              </div>
            </div>

            <span class="card-title">Detaliile anunțului</span>
            <div class="row">
              <div class="input-field col s12">
                <input id="title" type="text" v-model.lazy="formDates.titlu">
                <label for="title">Denumirea</label>
              </div>

              <div class="input-field col s6">
                <input id="price" type="text" v-model.lazy="formDates.price">
                <label for="price">Prețul</label>
              </div>

              <div class="input-field col s6">
                <input id="location" type="text" v-model.lazy="formDates.location">
                <label for="price">Localitatea</label>
              </div>

              <div class="col s12 markDown">
                <label for="describe">Descrierea <em>(se permite folosirea Markdown)</em></label>
                <textarea id="describe" v-model.lazy="formDates.describe"></textarea>
              </div>
            </div>

            <span class="card-title">Imaginiile anunțului</span>
            <div class="row">
              <div class="input-field col s12">
                <input @change="addImage" id="baseImage" type="text" class="validate" :disabled="formDates.images.length == 5">
                <label for="baseImage">Introduceși link-ul imaginii</label>
              </div>
            </div>

            <div class="row addImages__wrap" v-if="formDates.images.length > 0">
              <div class="col l3 m4 s6 addImages" v-for="(img, index) in formDates.images" :key="index">
                <a class="addImages__link z-depth-1" :href="img" title="Vizionare" target="_blank">
                  <img class="addImages__img" :src="img">
                </a>
                <a class="btn-floating waves-effect waves-light red addImages__remove"
                   @click.prevent="removeImage(index)"
                   title="Sterge imaginea"
                >&times;</a>
              </div>
            </div>

            <div class="row">
              <div class="col s12">
                <button type="submit" class="waves-effect waves-light btn">Editare</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>

</template>

<script>
import axios from '~plugins/axios'
var simplemde = null
export default {
  middleware: 'auth',
  mounted() {
    setTimeout(() => {
      simplemde = new SimpleMDE({ element: document.getElementById("describe") })
    }, 100)
  },
  data () {
    return {
      maxImage: 5,
      formDates: {
        tip_id: '',
        cat_id: '',
        titlu: '',
        price: '',
        describe: '',
        images: [],
        location: '',
        isEditImg: false
      }
    }
  },
  async asyncData({ params, redirect, isClient }) {
    let anunt = await axios.get('/api/foredit/' + params.id)
    if( anunt.data.status !== 'success' ) {
      if( isClient )
        Materialize.toast(anunt.data.message, 4000)
      redirect('/anuntul/' + params.id)
      return
    }

    return { formDates: anunt.data.item }
  },
  head () {
    return {
      title: 'Adaugare anunt',
      link: [
        { rel: 'stylesheet', type: 'text/css', href: '/libs/simpleMDE/simplemde.min.css' }
      ],
      script: [
        { src: '/libs/simpleMDE/simplemde.min.js', type: 'text/javascript' }
      ]
    }
  },
  methods: {
    addImage(e) {
      if( e.target.value && this.formDates.images.length <= this.maxImage ) {
        this.formDates.isEditImg = true
        this.formDates.images.push(e.target.value)
        e.target.value = ''
      }
      console.log(e.target.value)
    },
    removeImage(index) {
      this.formDates.isEditImg = true
      let findIndex = this.formDates.images.findIndex((el, ind) => ind === index)

      if( findIndex > -1 ) {
        this.formDates.images.splice(findIndex, 1)
      }
    },
    async save() {
      try {
        this.formDates.describe = simplemde.value()
        let ress = await axios.post('/api/anunt/edit', this.formDates)

        if (ress.data.status === 'success' && ress.data.id > 0) {
          Materialize.toast('Anunțul a fost editat!', 4000)
          this.$router.push('/anuntul/' + ress.data.id)
        } else Materialize.toast(ress.data.message, 4000)
      } catch (err) {
        console.error(err)
        Materialize.toast(err, 4000)
      }
    }
  }
}
</script>

<style>
  .markDown label {
    font-size: 1rem;
    margin-bottom: 10px;
    display: block;
  }

  .addImages__wrap {
    display: flex;
    flex-wrap: wrap;
  }

  .addImages {
    position: relative;
    margin-left: 0 !important;
    margin-bottom: 30px;
  }
  .addImages__link {
    display: block;
    border-radius: 3px;
  }
  .addImages__img {
    display: block;
    max-width: 100%;
    border-radius: 3px;
  }
  .addImages__remove {
    position: absolute;
    top: -5px;
    right: 5px;
    text-align: center;
    width: 20px;
    height: 20px;
    line-height: 20px;
  }
</style>
