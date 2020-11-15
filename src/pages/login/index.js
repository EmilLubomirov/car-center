import React, {useContext, useState} from "react";
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
import styles from "./index.module.css";

const LoginPage = () =>{

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isUsernameEmpty, setUsernameEmpty] = useState(false);
    const [isPasswordEmpty, setPasswordEmpty] = useState(false);

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

    const handleSubmit = (e) =>{

        e.preventDefault();

        const isUsernameEmpty = username.trim() === '';
        const isPasswordEmpty = password.trim() === '';

        setUsernameEmpty(isUsernameEmpty);
        setPasswordEmpty(isPasswordEmpty);

        if (isUsernameEmpty || isPasswordEmpty){
            return;
        }

        const url = "http://localhost:9999/api/user/login";
        const headers =  { 'Content-Type': 'application/json' };

        const body = JSON.stringify({
            username,
            password
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
                type: "error"
            });
        })
    };

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

                        <ButtonComponent value="Login"
                                         onClick={handleSubmit}/>

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