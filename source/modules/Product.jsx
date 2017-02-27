import React from 'react'
import { Link } from 'react-router'
import ProductStore from './ProductStore'

const Product = React.createClass({

  getStateFromStore() {
    const { id } = this.props.params;
    return {
      product: ProductStore.getProduct(id)
    }
  },

  getInitialState() {
    return this.getStateFromStore()
  },

  componentWillMount() {
    ProductStore.init()
  },

  componentDidMount() {
    ProductStore.addChangeListener(this.updateProduct)
  },

  componentWillUnmount() {
    ProductStore.removeChangeListener(this.updateProduct)
  },

  updateProduct() {
    this.setState(this.getStateFromStore())
  },

  render() {
    const product = this.state.product || false;
    const image = `/images/${product.id}.jpg`;

    if (product) {
      return (
        <div className="product">
          <header>
            <Link to="/"><i className="material-icons">&#xE5C4;</i><span>Back</span></Link>
          </header>
          <div className="product--image"><img src={image}/></div>
          <div className="product--details">
            <div className="product--overview">
              <div className="product--name">{product.name}</div>
              <div className="product--manufacturer">Manufacturer: {product.manufacturer}</div>
              <div className="product--class">Class: {product.class}</div>
            </div>
            <div className="product--specs">
              <div className="specs--title">Technical Specs:</div>
              <div className="product--length">Length: {product.techspecs['length']}</div>
              <div className="product--maxaccel">Max Accel: {product.techspecs['maxaccel'] || 'Configurable'}</div>
              <div className="product--mglt">MGLT: {product.techspecs['MGLT'] || 'Configurable'}</div>
              <div className="product--maxatmosphericspeed">Max Atmospheric Speed: {product.techspecs['maxatmosphericspeed'] || 'Configurable'}</div>
              <div className="product--hull">Hull: {product.techspecs['hull'] || 'Configurable'}</div>
              <div className="product--sensor">Sensor: {product.techspecs['sensor'] || 'Configurable'}</div>
              <div className="product--targeting">Targeting: {product.techspecs['targeting'] || 'Configurable'}</div>
              <div className="product--armament">Armament: {product.techspecs['armament'] || 'Configurable'}</div>
              <div className="product--communications">Communications: {product.techspecs['communications'] || 'Configurable'}</div>
            </div>
          </div>
        </div>
      )
    } else {
      return <div/>
    }
  }
})

export default Product;