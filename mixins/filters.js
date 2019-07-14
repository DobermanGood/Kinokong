export default {
  filters: {
    shortText: function (value, length=30, showMore=false) {
      if (!value) return value

      if(value.length > length)
        value = value.substr(0, length) + '...'

      // if(showMore) {
      //   value = value + el
      // }

      return value
    }
  }
}
