import React from "react";
import { Switch, Route } from "react-router-dom";
import RegisterPage from "./pages/register";

const Navigation = () =>{

    return (
        <Switch>
            <Route path="/register" component={RegisterPage}/>
        </Switch>
    )
};

export default Navigation;