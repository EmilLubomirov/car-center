import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/header";

const  App = (props) => {

    return (
        <>
            {props.children}
        </>
    )
};


export default App;
