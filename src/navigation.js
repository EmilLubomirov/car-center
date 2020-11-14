import React, {useContext} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
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
import AuthContext from "./AuthContext";

const Navigation = () =>{

    const context = useContext(AuthContext);
    const isLoggedIn = !!context.user;

    return (
        <Switch>
            <Route path="/" exact component={StorePage}/>

            <Route path="/register">
                {!isLoggedIn ? (<RegisterPage/>) : (<Redirect to="/"/>)}
            </Route>
            <Route path="/login">
                {!isLoggedIn ? (<LoginPage/>) : (<Redirect to="/"/>)}
            </Route>
            <Route path="/add-product">
                {isLoggedIn ? (<AddProductPage/>) : (<Redirect to="/login"/>)}
            </Route>
            <Route path="/cart/:userId">
                {isLoggedIn ? (<CartPage/>) : (<Redirect to="/login"/>)}
            </Route>
            <Route path="/order/:userId">
                {isLoggedIn ? (<OrderPage/>) : (<Redirect to="/login"/>)}
            </Route>

            <Route path="/services" component={ServicesPage}/>
            <Route path="/about" component={AboutPage}/>
            <Route path="/contacts" component={ContactsPage}/>
            <Route path="/product/:id" component={ProductDetailsPage}/>

            <Route component={ErrorPage}/>
        </Switch>
    )
};

export default Navigation;