import React from 'react'
import { Link } from 'react-router'
import ProductStore from './ProductStore'

const App = React.createClass({
  getInitialState() {
    return {
      products: ProductStore.getProducts(),
      loading: true
    }
  },

  componentWillMount() {
    ProductStore.init()
  },

  componentDidMount() {
    ProductStore.addChangeListener(this.updateProducts)
  },

  componentWillUnmount() {
    ProductStore.removeChangeListener(this.updateProducts)
  },

  updateProducts() {
    this.setState({
      products: ProductStore.getProducts(),
      loading: false
    })
  },

  render() {
    const products = this.state.products.map(function (product) {
      return (
        <div key={product.id} className="ship">
          <Link to={`/${product.id}`}>
            <div className="ship--image"><img src={`/images/${product.id}.jpg`}/></div>
            <div className="ship--name">{product.name}</div>
          </Link>
        </div>
      )
    })

    return (
      <section className="content">
        <header>
          <div className="logo">Watto's Starship Emporium</div>
        </header>
        <div className="ships">
          {products}
        </div>
      </section>
    )
  }
})

export default App;