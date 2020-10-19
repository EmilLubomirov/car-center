import React from "react";
import {Typography} from "@material-ui/core";

const Heading = ({type, value}) =>{

    return (
        <div>
            <Typography variant={type} >
               {value}
            </Typography>
        </div>
    )
};

export default Heading;