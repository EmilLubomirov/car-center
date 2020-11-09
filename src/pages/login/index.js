import React, {useContext, useState} from "react";
import {useHistory} from  "react-router-dom";
import PageLayout from "../../components/page-layout";
import Heading from "../../components/heading";
import Input from "../../components/input";
import ButtonComponent from "../../components/button";
import AuthContext from "../../AuthContext";
import {authenticate} from "../../utils/auth";
import Notification from "../../components/notification";
import Paper from "@material-ui/core/Paper";
import styles from "./index.module.css";

const LoginPage = () =>{

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState({
        isOpen: false,
        value: "",
        type: ""
    });

    const context = useContext(AuthContext);
    const history = useHistory();

    const handleUsernameChange = (e) =>{
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) =>{
        setPassword(e.target.value);
    };

    const handleMessageClose = () =>{
        setMessage({
            ...message,
            isOpen: false
        })
    };

    const handleSubmit = (e) =>{

        e.preventDefault();

        const url = "http://localhost:9999/api/user/login";
        const headers =  { 'Content-Type': 'application/json' };

        const body = JSON.stringify({
            username,
            password
        });

        authenticate(url, headers, body, async (response) =>{

            const {user, isAdmin} = await response.json();

            context.login({
                id: user._id,
                username: user.username,
                isAdmin
            });

            history.push('/', {
                message: "Successfully logged in",
                type: "success"
            });
        }, (e) => {
            console.error(e);

            setMessage({
                isOpen: true,
                value: "Login failed! Try again!",
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
                               onChange={handleUsernameChange}/>
                        <Input label="Password" type="password" id="password" value={password}
                               onChange={handlePasswordChange}/>

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