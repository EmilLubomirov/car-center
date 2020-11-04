import React from "react";
import ListItem from "../list-item";

const ServicesList = () =>{

    const services = [
        "MOT (Ministry of transport) test ( 30 vl. )",
        "Car Wash ( 25lv. )",
        "Car service ( depends on the defect )"
    ];

    return (
        <div>
            <ul>
                {
                    services.map((val, index) =>{
                        return <ListItem key={index} value={val}/>
                    })
                }
            </ul>
        </div>
    )
};

export default ServicesList;