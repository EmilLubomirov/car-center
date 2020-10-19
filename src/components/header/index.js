import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import styles from "./index.module.css";
import LinkComponent from "../link";
import getNavigation from "../../utils/navigation";
import Container from "@material-ui/core/Container";

const Header = () =>{

    const navigation = getNavigation();

    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Typography variant="h4" >
                        Car Center
                    </Typography>

                    <div className={styles.wrapper}>
                        {
                            navigation.map((navItem, index) => {
                                return <LinkComponent key={index}
                                                      path={navItem.path}
                                                      title={navItem.title}/>
                            })
                        }
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    )
};

export default Header;

