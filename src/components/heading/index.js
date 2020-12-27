import React from "react";
import {Typography} from "@material-ui/core";

const Heading = ({type, value, fontWeight}) =>{

    return (
        <div>
            <Typography style={{
                fontWeight: fontWeight || "normal"
            }} variant={type} >
               {value}
            </Typography>
        </div>
    )
};

export default Heading;