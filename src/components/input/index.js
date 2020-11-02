import React from "react";
import TextField from "@material-ui/core/TextField";

const Input = ({ id, label, type, value, onChange, name,
                   required, isTextArea, min, max, defaultValue}) =>{

    return (
        <div>
            <TextField
                defaultValue={defaultValue}
                inputProps={{ min: `${min}`, max: `${max}`}}
                multiline={isTextArea}
                required={required}
                id={id}
                name={name}
                label={label}
                type={type}
                margin="normal"
                variant="outlined"
                value={value}
                onChange={onChange}
            />
        </div>
    )
};

export default Input;