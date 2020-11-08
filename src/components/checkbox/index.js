import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const CheckboxComponent = ({value, color, placement, isChecked, handleChange}) => {

    return (
        <div>
            <FormControlLabel
                value={value}
                control={isChecked ? (<Checkbox checked color={color || "default"} />) :
                                     (<Checkbox color={color || "default"} />)}
                label={value}
                labelPlacement={placement || "end"}
                onChange={handleChange}
            />
        </div>
    )
};

export default CheckboxComponent;