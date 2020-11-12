import React from "react";
import Button from "@material-ui/core/Button";

const ButtonComponent = ({ value, color, size, onClick, children}) =>{

    return (
        <div>
            <Button
                size = {size || "medium"}
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