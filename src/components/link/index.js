import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

const LinkComponent = ({path, title}) =>{

    return (
        <div data-test-id={`link-${title}`}>
            <Link to={path}>{title}</Link>
        </div>
    )
};

export default LinkComponent;