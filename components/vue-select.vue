<template>
  <div class="select-wrapper" :class="{'open': open}">
    <span class="caret">▼</span>
    <input
            readonly="true"
            type="text"
            class="select-dropdown"
            :value="placeholder"
            @blur="onSearchBlur"
            @focus="onSearchFocus"
    >

    <transition name="fade">
      <ul v-if="open" class="dropdown-content select-dropdown active">
        <li v-if="placeholder" class="disabled"><span>{{ placeholder }}</span></li>
        <li v-for="(opt, index) in mutableOptions" :key="index" :class="{'active selected': opt.select}">
          <a @mousedown.prevent="select(index)">
            <span v-text="opt.title"></span>
          </a>
        </li>
      </ul>
    </transition>

  </div>
</template>

<script>
  export default {
    props: {
      value: {
        default: null
      },
      options: {
        type: Array,
        default() {
          return []
        }
      },
      searchable: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    created() {
      if( this.options ) {
        this.options.forEach((item, index) => {
          this.mutableOptions.push({
            id: index + 1,
            title: item,
            select: false,
            hover: false
          })
        })
      }
    },

    data() {
      return {
        search: '',
        open: false,
        mutableValue: null,
        mutableOptions: []
      }
    },

    methods: {
      onSearchBlur() {
        this.open = false
        this.$emit('search:blur')
      },
      onSearchFocus() {
        this.open = true
        this.$emit('search:focus')
      },
      select(index) {
        //this.value = index + 1;
        this.mutableOptions[index].select = true;
      }
    },

    computed: {
      getOptions() {
        console.log('getOptions', typeof this.options)
        console.log(this.options)
        if( typeof this.options === 'object' ) {
          return this.options;
        }

        return {};
      }
    }
  }
</script>

<style>
  .select-dropdown.active {
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    opacity: 1;
    display: block;
  }
  .select-wrapper .fade-enter,
  .select-wrapper .fade-leave-to {
    opacity: 0;
    top: -10px;
  }
  .select-wrapper .fade-enter-active,
  .select-wrapper .fade-leave-active{
    transition: top .3s, opacity .4s;
    overflow: hidden;
  }
</style>
