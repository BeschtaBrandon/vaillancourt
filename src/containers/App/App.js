import React from 'react';
import { Route, Link } from 'react-router-dom';
import Confirm from '../Confirm/Confirm';
import Product from '../Product/Product';
import Destination from '../Destination/Destination';
import Origin from '../Origin/Origin';
import Quantity from '../Quantity/Quantity';

import './App.scss';

const App = () => (
  <div>
    <header>
      <nav>
        <ul className="list">
          <li className="item">
            <Link to="/">Produit</Link>
          </li>
          <li className="item">
            <Link to="/origin/">Origine</Link>
          </li>
          <li className="item">
            <Link to="/quantity/">Quantité</Link>
          </li>
          <li className="item">
            <Link to="/destination/">Destination</Link>
          </li>
          <li className="item">
            <Link to="/confirm/">Confirmation</Link>
          </li>
        </ul>
      </nav>
    </header>

    <main className="App">
      <Route path="/" exact component={Product} />
      <Route path="/origin/" component={Origin} />
      <Route path="/quantity/" component={Quantity} />
      <Route path="/destination/" component={Destination} />
      <Route path="/confirm/" component={Confirm} />
    </main>
  </div>
)

export default App;
