import React from "react";
import {MenuItem, TextField} from "@material-ui/core";

const SelectComponent = ({values, value, label, handleChange}) =>{

    return (
        <TextField style={{width: "50%"}} id="select" label={label} value={value} select onChange={handleChange}>
            {Array.from(values).map((v, index) =>{
                return <MenuItem key={v._id || index} value={v.name}>{v.name}</MenuItem>
            })}
        </TextField>
    )
};

export default SelectComponent;