import React from "react";
import TextField from "@material-ui/core/TextField";

const Input = ({ id, label, type, value, onChange, name,
                   required, helperText, error, isTextArea, min, max, defaultValue}) =>{

    return (
        <div>
            <TextField
                defaultValue={defaultValue}
                inputProps={{ min: `${min}`, max: `${max}`}}
                multiline={isTextArea}
                required={required}
                error={error}
                helperText={helperText}
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