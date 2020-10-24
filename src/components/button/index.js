import React from "react";
import Button from "@material-ui/core/Button";

const ButtonComponent = ({ value, color, onClick, children}) =>{

    return (
        <div>
            <Button
                variant="contained"
                color={color || "primary"}
                onClick={onClick}
            >
                {children}
                {value}
            </Button>
        </div>
    )
};

export default ButtonComponent;