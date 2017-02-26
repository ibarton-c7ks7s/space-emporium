const API = 'http://demo7475333.mockable.io/spaceships'

let _products = [];
let _initCalled = false
let _changeListeners = []

const ProductStore = {

  init: function () {
    if (_initCalled)
      return

    _initCalled = true

    getJSON(API, function (err, res) {
      const products = res.products.map(product => {
        product.id = product.name.toLowerCase().split(' ').join('-');
        return product;
      });
      _products = products;

      ProductStore.notifyChange()
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

localStorage.token = localStorage.token || (Date.now()*Math.random())

function getJSON(url, cb) {
  const req = new XMLHttpRequest()
  req.onload = function () {
    if (req.status === 404) {
      cb(new Error('not found'))
    } else {
      cb(null, JSON.parse(req.response))
    }
  }
  req.open('GET', url)
  req.setRequestHeader('authorization', localStorage.token)
  req.send()
}

export default ProductStore