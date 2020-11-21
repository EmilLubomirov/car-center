import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHistory, useLocation} from  "react-router-dom";
import PageLayout from "../../components/page-layout";
import Heading from "../../components/heading";
import Input from "../../components/input";
import ButtonComponent from "../../components/button";
import AuthContext from "../../AuthContext";
import {authenticate} from "../../utils/auth";
import {MESSAGE_TYPES, MESSAGES} from "../../utils/constants";
import Notification from "../../components/notification";
import Paper from "@material-ui/core/Paper";
import FacebookLogin from 'react-facebook-login';
import styles from "./index.module.css";

const LoginPage = () =>{

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isUsernameEmpty, setUsernameEmpty] = useState(false);
    const [isPasswordEmpty, setPasswordEmpty] = useState(false);

    const [fbContent, setFbContent] = useState({
        isLoggedIn: false,
        email: '',
        accessToken: ''
    });

    const location = useLocation();
    const { state } = location;

    const [message, setMessage] = useState({
        isOpen: state ? !!state.message : false,
        value: state ? state.message || "" : "",
        type: state ? state.type || "" : ""
    });

    const context = useContext(AuthContext);
    const history = useHistory();

    const handleUsernameChange = (e) =>{

        const { value } = e.target;
        setUsername(value);

        const isUsernameEmpty = value.trim() === '';
        setUsernameEmpty(isUsernameEmpty);
    };

    const handlePasswordChange = (e) =>{

        const { value } = e.target;
        setPassword(value);

        const isPasswordEmpty = value.trim() === '';
        setPasswordEmpty(isPasswordEmpty);
    };

    const handleMessageClose = () =>{
        setMessage({
            ...message,
            isOpen: false
        })
    };

    const handleSubmit = useCallback((e) =>{

        if (e) { e.preventDefault(); }

        const { email, accessToken } = fbContent;
        const isFacebookLogin = email && accessToken;

        if (!isFacebookLogin){
            const isUsernameEmpty = username.trim() === '';
            const isPasswordEmpty = password.trim() === '';

            setUsernameEmpty(isUsernameEmpty);
            setPasswordEmpty(isPasswordEmpty);

            if (isUsernameEmpty || isPasswordEmpty){
                return;
            }
        }

        const url = "http://localhost:9999/api/user/login";
        const headers =  { 'Content-Type': 'application/json' };

        const body = !isFacebookLogin ? JSON.stringify({
            username,
            password
        }) : JSON.stringify({
            isFacebook: true,
            username: email,
            password: accessToken
        });

        authenticate(url, headers, body, async (response) =>{

            const {user, isAdmin} = await response.json();

            history.push('/', {
                message: MESSAGES.successfulLogin,
                type: MESSAGE_TYPES.success
            });

            context.login({
                id: user._id,
                username: user.username,
                isAdmin
            });
        }, (e) => {
            console.error(e);

            setMessage({
                isOpen: true,
                value: MESSAGES.userNotFound,
                type: MESSAGE_TYPES.error
            });
        })
    }, [context, fbContent, history, password, username]);

    const responseFacebook = async (response) => {

        const { email, accessToken } = response;

        try {
           await fetch("http://localhost:9999/api/user/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: email,
                    password: accessToken
                })
            });
        }

        finally {
            setFbContent({
                isLoggedIn: true,
                email,
                accessToken
            });
        }
    };

    useEffect(() => {
        if (fbContent.isLoggedIn){
            handleSubmit();
        }
    }, [fbContent.isLoggedIn, handleSubmit]);

    return (
        <PageLayout>
            <Paper className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.heading}>
                        <Heading type="h4" value="Login"/>
                    </div>
                    <form className={styles.form}>
                        <Input label="Username" type="text" id="username" value={username}
                               onChange={handleUsernameChange}
                               required={true}
                               helperText={isUsernameEmpty ? "Username should not be empty" : ""}
                               error={isUsernameEmpty}/>

                        <Input label="Password" type="password" id="password" value={password}
                               onChange={handlePasswordChange}
                               required={true}
                               helperText={isPasswordEmpty ? "Password should not be empty" : ""}
                               error={isPasswordEmpty}/>

                               <div className={styles.btn}>
                                   <ButtonComponent  value="Login"
                                                     onClick={handleSubmit}/>
                               </div>

                        {

                            !fbContent.isLoggedIn ?
                                (
                                    <div className={styles.btn}>
                                        <FacebookLogin
                                            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                                            autoLoad={false}
                                            fields="name,email"
                                            callback={responseFacebook} />
                                    </div>
                                ) : null
                        }

                        <Notification type={message.type}
                                      message={message.value}
                                      isOpen={message.isOpen}
                                      duration={5000}
                                      onClose={handleMessageClose}/>
                    </form>
                </div>
            </Paper>
        </PageLayout>
    )
};

export default LoginPage;