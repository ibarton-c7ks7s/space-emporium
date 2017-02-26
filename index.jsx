import React from 'react'
import { render, findDOMNode } from 'react-dom'
import { browserHistory, Router, Route, IndexRoute, Link, withRouter } from 'react-router'
import ProductStore from './source/modules/ProductStore'

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

const Index = React.createClass({
  render() {
    return <h1>Address Book</h1>
  }
})

const Product = withRouter(
  React.createClass({

    getStateFromStore(props) {
      const { id } = props ? props.params : this.props.params
      return {
        product: ProductStore.getProduct(id)
      }
    },

    getInitialState() {
      return this.getStateFromStore()
    },

    componentDidMount() {
      ProductStore.addChangeListener(this.updateProduct)
    },

    componentWillUnmount() {
      ProductStore.removeChangeListener(this.updateProduct)
    },

    componentWillReceiveProps(nextProps) {
      this.setState(this.getStateFromStore(nextProps))
    },

    updateProduct() {
      this.setState(this.getStateFromStore())
    },

    destroy() {
      const { id } = this.props.params
      ProductStore.removeProduct(id)
      this.props.router.push('/')
    },

    render() {
      const product = this.state.product || false;
      const image = `/images/${product.id}.jpg`;

      if (product) {
        return (
          <div className="product">
            <Link to="/"><i className="material-icons">arrow_back</i></Link>
            <div className="product--overview">
              <div className="product--image"><img src={image}/></div>
              <div className="product--name">{product.name}</div>
              <div className="product--manufacturer">Manufacturer: {product.manufacturer}</div>
              <div className="product--class">Class: {product.class}</div>
            </div>
            <div className="product--specs">
              <div className="specs--title">Technical Specs:</div>
              <div className="product--length">Length: {product.techspecs['length']}</div>
              <div className="product--maxaccel">Max Accel: {product.techspecs['maxaccel']}</div>
              <div className="product--mglt">MGLT: {product.techspecs['MGLT']}</div>
              <div className="product--maxatmosphericspeed">Max Atmospheric Speed: {product.techspecs['maxatmosphericspeed']}</div>
              <div className="product--hull">Hull: {product.techspecs['hull']}</div>
              <div className="product--sensor">Sensor: {product.techspecs['sensor']}</div>
              <div className="product--targeting">Targeting: {product.techspecs['targeting']}</div>
              <div className="product--armament">Armament: {product.techspecs['armament']}</div>
              <div className="product--communications">Communications: {product.techspecs['communications']}</div>
            </div>
          </div>
        )
      } else {
        return <div/>
      }
    }
  })
)

const NotFound = React.createClass({
  render() {
    return <h2>Not found</h2>
  }
})

render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/:id" component={Product} />
  </Router>
), document.getElementById('app'))