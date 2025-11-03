import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Auth from '../pages/Auth';
import Header from '../components/Header';

const Routes = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/product/:id" component={ProductDetails} />
                <Route path="/cart" component={Cart} />
                <Route path="/auth" component={Auth} />
            </Switch>
        </Router>
    );
};

export default Routes;