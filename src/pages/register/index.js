import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Heading from "../../components/heading";
import Input from "../../components/input";
import ButtonComponent from "../../components/button";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import  {MESSAGES} from "../../utils/constants";
import styles from "./index.module.css";
import Notification from "../../components/notification";

const RegisterPage = () =>{

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [isUsernameEmpty, setUsernameEmpty] = useState(false);
    const [isPasswordEmpty, setPasswordEmpty] = useState(false);
    const [isRePasswordEmpty, setRePasswordEmpty] = useState(false);

    const [message, setMessage] = useState({
        isOpen: false,
        value: "",
        type: ""
    });

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

    const handleRePasswordChange = (e) =>{
        const { value } = e.target;
        setRePassword(value);

        const isRePasswordEmpty = value.trim() === '';
        setRePasswordEmpty(isRePasswordEmpty);
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
        const isRePasswordEmpty = rePassword.trim() === '';

        setUsernameEmpty(isUsernameEmpty);
        setPasswordEmpty(isPasswordEmpty);
        setRePasswordEmpty(isRePasswordEmpty);

        if (isUsernameEmpty || isPasswordEmpty || isRePasswordEmpty){
            return;
        }

        if (password !== rePassword){

            setMessage({
                isOpen: true,
                value: MESSAGES.passwordsNotMatch,
                type: "error"
            });

            return;
        }

        fetch("http://localhost:9999/api/user/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then(response => {

            if (response.status === 200){
                history.push('/login');
            }

            else{
                setMessage({
                    isOpen: true,
                    value: MESSAGES.userAlreadyExists,
                    type: "error"
                });
            }
        })
    };

    return (
        <PageLayout>
            <Paper className={styles.container}>
                <div className={styles.wrapper}>
                    <Heading type="h4" value="Register"/>
                    <form>
                        <Input label="Username" type="text" id="username" value={username}
                               name="username"
                               required={true}
                               error={isUsernameEmpty}
                               helperText={isUsernameEmpty ? MESSAGES.emptyUsername : ""}
                               onChange={handleUsernameChange}/>
                        <Input label="Password" type="password" id="password" value={password} name="password"
                               required={true}
                               error={isPasswordEmpty}
                               helperText={isPasswordEmpty ? MESSAGES.emptyPassword : ""}
                               onChange={handlePasswordChange}/>
                        <Input label="RePassword" type="password" id="rePassword" value={rePassword} name="rePassword"
                               required={true}
                               error={isRePasswordEmpty}
                               helperText={isRePasswordEmpty ? MESSAGES.emptyRePassword : ""}
                               onChange={handleRePasswordChange}/>
                        <Box textAlign="center">
                            <ButtonComponent value="Register"
                                             onClick={handleSubmit}/>
                        </Box>
                    </form>

                    <Notification type={message.type}
                                  message={message.value}
                                  isOpen={message.isOpen}
                                  duration={5000}
                                  onClose={handleMessageClose}/>
                </div>
            </Paper>
        </PageLayout>
    )
};

export default RegisterPage;