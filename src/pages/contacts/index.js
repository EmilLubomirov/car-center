import React, {useState} from "react";
import PageLayout from "../../components/page-layout";
import Heading from "../../components/heading";
import MapComponent from "../../components/map";
import Paper from "@material-ui/core/Paper";
import styles from "./index.module.css"
import LoadingBar from "../../components/loading-bar";

const ContactsPage = () =>{

    const [isLoading, setLoading] = useState(true);

    const mapUrl = (
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.348163315956!2d23." +
        "294734914918074!3d42.67516677916703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13." +
        "1!3m3!1m2!1s0x40aa84e0f10b9af3%3A0xe208f424e0dcffa0!2z0LHRg9C7LiDigJ7QkdGK0L" +
        "vQs9Cw0YDQuNGP4oCcIDM3LCAxNDA4INC2LtC6LiDQodGC0YDQtdC70LHQuNGJ0LUsINCh0L7RhNC40Y8!" +
        "5e0!3m2!1sbg!2sbg!4v1604503335025!5m2!1sbg!2sbg"
    );

    return (
        <PageLayout>
           <Paper className={styles.wrapper}>
               <div className={styles.heading}>
                   <Heading type="h4" value="Contacts"/>
               </div>

               {
                   isLoading ? (
                       <div className={styles.loader}>
                           <LoadingBar type="spin" color="black" width="50px" height="50px"/>
                       </div>
                   ) : null
               }

               <MapComponent setLoading={setLoading} url={mapUrl}/>

               <div>
                   <p>
                       Phone: +359 876 312 313
                   </p>
                   <p>
                       Facebook: Car-Center
                   </p>
                   <p>
                       Working schedule: Monday - Friday
                   </p>
                   <p>
                       9:00 - 19:00
                   </p>
               </div>
           </Paper>
        </PageLayout>
    )
};

export default ContactsPage;