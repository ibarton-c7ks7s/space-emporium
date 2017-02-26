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
        <li key={product.id}>
          <Link to={`/${product.id}`}>
            <div className="ship--image"><img src={`/images/${product.id}.jpg`} width="300"/></div>
            <div className="ship--name">{product.name}</div>
          </Link>
        </li>
      )
    })

    return (
      <div className="App">
        <div className="ProductList">
          <ul>
            {products}
          </ul>
        </div>
        <div className="Content">
          {this.props.children}
        </div>
      </div>
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
          <div>
            <Link to="/">Home</Link>
            <div className="Product">
              <img height="50" src={image} />
              <h3>{product.name}</h3>
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