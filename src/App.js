import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import { StylesProvider } from "@material-ui/core";
import AuthContext from "./AuthContext";
import {getLoggedInUser} from "./utils/auth";

const  App = (props) => {

    const [state, setState] = useState({
        user: undefined,
        login: (user) =>{
            setState({
                ...state,
                user: { ...user, isLoggedIn: true},
            });
        },
        logout: () =>{
            setState({
                ...state,
                user: null,
            });
        }
    });

    const checkUserStatus = useCallback(async () =>{
        const user = await getLoggedInUser();

        setState({
            ...state,
            user,
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() =>{
        checkUserStatus();
    }, [checkUserStatus]);

    return (
        <StylesProvider injectFirst>
            <AuthContext.Provider value={state}>
                {props.children}
            </AuthContext.Provider>
        </StylesProvider>
    )
};


export default App;
