import React from "react";

const MapComponent = ({url, setLoading}) =>{

    return (
        <div>
            <iframe title="coordinates"
                    src={url}
                    width="600" height="450" style={{maxWidth: "100%"}} frameBorder="0"
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                    onLoad={() => setLoading(false)}>
            </iframe>
        </div>
    )
};

export default MapComponent;

