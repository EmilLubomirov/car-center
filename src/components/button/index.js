import React from "react";
import Button from "@material-ui/core/Button";

const ButtonComponent = ({ type, value, onClick}) =>{

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={onClick}
            >
                {value}
            </Button>
        </div>
    )
};

export default ButtonComponent;