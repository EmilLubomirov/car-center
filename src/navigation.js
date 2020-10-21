import React from "react";
import { Switch, Route } from "react-router-dom";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";

const Navigation = () =>{

    return (
        <Switch>
            <Route path="/register" component={RegisterPage}/>
            <Route path="/login" component={LoginPage}/>
        </Switch>
    )
};

export default Navigation;