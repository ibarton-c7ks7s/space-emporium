import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  componentDidMount() {
    fetch('http://demo7475333.mockable.io/spaceships').then(response => {
      return response.json();
    }).then(json => {
      const products = json.products.map(product => {
        product.id = product.name.toLowerCase().split(' ').join('-');
        return product;
      });
      this.setState({ products });
    })
  }

  render() {
    return (
      <div>
        <h1>Welcome to Watto's Starship Emporium</h1>
        <ul>
          {this.state.products.map(product =>
            <li key={product.id}>
              <label>{product.name}</label>
              <img src={`/images/${product.id}.jpg`}/>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;