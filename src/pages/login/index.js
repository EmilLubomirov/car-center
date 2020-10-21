import React, {useContext, useState} from "react";
import {useHistory} from  "react-router-dom";
import PageLayout from "../../components/page-layout";
import Heading from "../../components/heading";
import Input from "../../components/input";
import ButtonComponent from "../../components/button";
import AuthContext from "../../AuthContext";
import {authenticate} from "../../utils/auth";
import styles from "./index.module.css";
import Box from "@material-ui/core/Box";

const LoginPage = () =>{

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const context = useContext(AuthContext);
    const history = useHistory();

    const handleUsernameChange = (e) =>{
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) =>{
        setPassword(e.target.value);
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

            const {_id, username } = await response.json();

            context.login({
                id: _id,
                username
            });

            history.push('/');
        }, (e) => console.error(e))
    };

    return (
        <PageLayout>
            <div className={styles.wrapper}>
                <Heading type="h4" value="Login"/>
                <form>
                    <Input label="Username" type="text" id="username" value={username}
                           onChange={handleUsernameChange}/>
                    <Input label="Password" type="password" id="password" value={password}
                           onChange={handlePasswordChange}/>
                     <Box textAlign="center">
                         <ButtonComponent value="Login"
                                          onClick={handleSubmit}/>
                     </Box>
                </form>
            </div>
        </PageLayout>
    )
};

export default LoginPage;