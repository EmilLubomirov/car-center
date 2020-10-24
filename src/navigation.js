import React from "react";
import { Switch, Route } from "react-router-dom";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import AddProductPage from "./pages/add-product";
import StorePage from "./pages/store";
import ProductDetailsPage from "./pages/product-details";

const Navigation = () =>{

    return (
        <Switch>
            <Route path="/" exact component={StorePage}/>
            <Route path="/register" component={RegisterPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/add-product" component={AddProductPage}/>
            <Route path="/product/:id" component={ProductDetailsPage}/>
        </Switch>
    )
};

export default Navigation;