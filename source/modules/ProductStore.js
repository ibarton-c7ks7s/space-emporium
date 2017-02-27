const API = 'http://demo7475333.mockable.io/spaceships'

let _products = [];
let _initCalled = false
let _changeListeners = []

const ProductStore = {

  init: function () {
    if (_initCalled)
      return

    _initCalled = true

    fetch(API).then(response => {
      return response.json();
    }).then(json => {
      const products = json.products.map(product => {
        product.id = product.name.toLowerCase().split(' ').join('-');
        return product;
      });
      _products = products;

      ProductStore.notifyChange();
    }).catch(err => {
      console.log(err);
    })
  },

  getProducts: function () {
    const array = []

    for (const id in _products)
      array.push(_products[id])

    return array
  },

  getProduct: function (id) {
    return _products.filter(product => {
      return product.id === id;
    })[0];
  },

  notifyChange: function () {
    _changeListeners.forEach(function (listener) {
      listener()
    })
  },

  addChangeListener: function (listener) {
    _changeListeners.push(listener)
  },

  removeChangeListener: function (listener) {
    _changeListeners = _changeListeners.filter(function (l) {
      return listener !== l
    })
  }

}

export default ProductStore;