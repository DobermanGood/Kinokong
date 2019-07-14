import * as Api from '../common/api.js'

export default ({ app }, inject) => {
  inject('api', Api)
}
