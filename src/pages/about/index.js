import React from "react";
import PageLayout from "../../components/page-layout";
import Heading from "../../components/heading";
import Paper from "@material-ui/core/Paper";
import ServicesList from "../../components/services-list";
import styles from "./index.module.css";

const AboutPage = () =>{

    return(
        <PageLayout>
            <Paper className={styles.wrapper}>
                <Heading type="h4" value="About"/>
                <figure>
                    <img className={styles.image}
                         src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/upload/v1604498894/mechanic_vuzr4q.jpg`}
                         alt="mechanic"/>
                </figure>

                <div className={styles.description}>
                   <i className={styles.important}>Car Center</i> is a company with over 20 years of experience since it has been created.
                    Here you will meet our 5 high qualified mechanics who are so kind and ready to help you at any time.
                    You are able to choose from 3 main services:

                    <ServicesList/>

                    Now we give our customers the opportunity to make an appointment through our site. No more waste of time!
                    Car Center also helps you to maintain your car as it provides wide range of products most needed.
                    Delivery price is fixed to 5 lv. and if your purchase is greater than 50 lv. it is <span className={styles.important}>FREE</span>.
                    Go to our store page and make an order now!
                </div>
            </Paper>
        </PageLayout>
    )
};

export default AboutPage;