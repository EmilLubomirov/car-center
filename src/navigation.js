import React from "react";
import { Switch, Route } from "react-router-dom";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import AddProductPage from "./pages/add-product";

const Navigation = () =>{

    return (
        <Switch>
            <Route path="/register" component={RegisterPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/add-product" component={AddProductPage}/>
        </Switch>
    )
};

export default Navigation;