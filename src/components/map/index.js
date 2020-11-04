import React from "react";

const MapComponent = ({url}) =>{

    return (
        <div>
            <iframe title="coordinates"
                    src={url}
                    width="600" height="450" frameBorder="0"
                    // style="border:0;"
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0">
            </iframe>
        </div>
    )
};

export default MapComponent;

