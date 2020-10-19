import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/header";
import { StylesProvider } from "@material-ui/core";

const  App = (props) => {

    return (
        <StylesProvider injectFirst>
            {props.children}
        </StylesProvider>
    )
};


export default App;
