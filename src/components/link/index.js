import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

const LinkComponent = ({path, title, children}) =>{

    return (
        <div data-test-id={`link-${title}`}>
            <Link className={styles.link} to={path}>
                {children}
                {title}
            </Link>
        </div>
    )
};

export default LinkComponent;