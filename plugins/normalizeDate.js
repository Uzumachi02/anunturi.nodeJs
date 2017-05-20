import Vue from 'vue'
import dateformat from 'dateformat'

Vue.filter('normalizeDate', (date, format) => {
  let thisFormat = format || 'dd.mm.yy HH:MM'
  let dt = new Date(date)
  return dateformat(dt, thisFormat)
})
