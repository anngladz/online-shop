import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';

import MainLayout  from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { ProductPage } from './components/views/ProductPage/ProductPage';
import { Cart } from './components/views/Cart/Cart';
import { OrderForm } from './components/views/OrderForm/OrderForm';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/product/:id' component={ProductPage} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/form' component={OrderForm} />
          </Switch>
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
