import Typography from "@material-ui/core/Typography";
import React from "react";
import { AppBar, Container, Toolbar }from "@material-ui/core";
import styles from "./index.module.css";

const Footer = () =>{

    return (
        <AppBar position="static" color="primary">
            <Container>
                <Toolbar>
                    <Typography className={styles.terms} variant="body1" color="inherit">
                        Copyright &copy; {new Date().getFullYear()} Car Center, Inc.
                        All rights reserved.
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
};

export default Footer;