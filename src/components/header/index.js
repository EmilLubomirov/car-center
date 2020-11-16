import React, {useContext} from "react";
import {useHistory} from "react-router-dom"
import { AppBar, Toolbar } from "@material-ui/core";
import styles from "./index.module.css";
import LinkComponent from "../link";
import getNavigation from "../../utils/navigation";
import Container from "@material-ui/core/Container";
import AuthContext from "../../AuthContext";
import ButtonComponent from "../button";
import  {MESSAGES, MESSAGE_TYPES} from "../../utils/constants";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const Header = () =>{

    const context = useContext(AuthContext);
    const history = useHistory();

    const navigation = getNavigation(context.user);

    const handleLogout = () =>{
        context.logout();

        sessionStorage.removeItem("tags");
        document.cookie = "x-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        history.push('/login', {
            message: MESSAGES.successfulLogout,
            type: MESSAGE_TYPES.success
        });
    };

    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <img className={styles.logo} src="/car-logo.png" alt="logo"/>
                    <div className={styles.wrapper}>
                        {
                            navigation.map((navItem, index) => {

                                if (navItem.title.toLowerCase().includes("cart")){

                                    return <LinkComponent key={index}
                                                   path={navItem.path}
                                                   title={navItem.title}>
                                        <ShoppingCartIcon/>
                                    </LinkComponent>
                                }
                                return <LinkComponent key={index}
                                                      path={navItem.path}
                                                      title={navItem.title}/>
                            })
                        }
                    </div>
                    {context.user ? (<ButtonComponent value="Logout" color="secondary" onClick={handleLogout}/>): null}
                </Toolbar>
            </Container>
        </AppBar>
    )
};

export default Header;

