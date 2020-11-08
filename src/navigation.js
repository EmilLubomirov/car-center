import React from "react";
import { Switch, Route } from "react-router-dom";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import AddProductPage from "./pages/add-product";
import StorePage from "./pages/store";
import ProductDetailsPage from "./pages/product-details";
import CartPage from "./pages/cart";
import OrderPage from "./pages/order";
import ServicesPage from "./pages/services";
import AboutPage from "./pages/about";
import ContactsPage from "./pages/contacts";
import ErrorPage from "./pages/error";

const Navigation = () =>{

    return (
        <Switch>
            <Route path="/" exact component={StorePage}/>
            <Route path="/register" component={RegisterPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/add-product" component={AddProductPage}/>
            <Route path="/product/:id" component={ProductDetailsPage}/>
            <Route path="/cart/:userId" component={CartPage}/>
            <Route path="/order/:userId" component={OrderPage}/>
            <Route path="/services" component={ServicesPage}/>
            <Route path="/about" component={AboutPage}/>
            <Route path="/contacts" component={ContactsPage}/>
            <Route component={ErrorPage}/>
        </Switch>
    )
};

export default Navigation;