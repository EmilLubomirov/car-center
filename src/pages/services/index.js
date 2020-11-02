import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Heading from "../../components/heading";
import Input from "../../components/input";
import PageLayout from "../../components/page-layout";
import styles from "./index.module.css";
import {MenuItem, TextField} from "@material-ui/core";
import ButtonComponent from "../../components/button";
import Notification from "../../components/notification";
import AuthContext from "../../AuthContext";

const ServicesPage = () =>{

    const context = useContext(AuthContext);

    const [serviceTags, setServiceTags] = useState([]);
    const [tag, setTag] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [date, setDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [carLicensePlate, setCarLicensePlate] = useState('');

    const [message, setMessage] = useState({
        isOpen: false,
        value: "",
        type: ""
    });

    const history = useHistory();

    const handleFirstNameChange = (e) =>{
      setFirstName(e.target.value);
    };

    const handleSurnameChange = (e) =>{
      setSurname(e.target.value);
    };

    const handleDateChange = (e) =>{
        setDate(e.target.value);
    };

    const handlePhoneNumberChange = (e) =>{
        setPhoneNumber(e.target.value);
    };

    const handleCarLicensePlateChange = (e) =>{
        setCarLicensePlate(e.target.value);
    };

    const handleTagChange = (e) =>{
        setTag(e.target.value);
    };

    const handleMessageClose = () =>{
        setMessage({
            ...message,
            isOpen: false
        })
    };

    const handleClick = () =>{

        const url = "http://localhost:9999/api/service";
        const headers = { 'Content-Type': 'application/json' };
        const body = JSON.stringify({
            userId: context.user.id,
            firstName,
            surname,
            phoneNumber,
            carLicensePlate,
            appointment: date,
            tag,
        });

        fetch(url, {
            method: "POST",
            headers,
            body
        }).then(response => {

            if (response.status === 200) {
                history.push('/');
            }

            else{
                setMessage({
                    isOpen: true,
                    value: "Service appointment failed! Try again!",
                    type: "error"
                });
            }
        })
    };

    const getServiceTags = useCallback(async () =>{

        const url = 'http://localhost:9999/api/service-tag';

        const promise = await fetch(url);
        const serviceTags = await promise.json();
        setServiceTags([...serviceTags]);
    }, []);

    useEffect(() =>{
        getServiceTags();
    }, [getServiceTags]);

    return (
        <PageLayout>
            <div className={styles.wrapper}>
                <Heading type="h4" value="Do not waste your time! Make an appointment now!"/>
                <form>
                    <Input label="First name" type="text" id="firstName" value={firstName}
                           onChange={handleFirstNameChange}/>
                    <Input label="Surname" type="text" id="surname" value={surname}
                           onChange={handleSurnameChange}/>
                    <Input label="Phone number" type="tel" id="phoneNumber" value={phoneNumber}
                           onChange={handlePhoneNumberChange}/>
                    <Input label="Car license plate" type="text" id="carLicencePlate" value={carLicensePlate}
                           onChange={handleCarLicensePlateChange}/>
                    <Input type="datetime-local" id="time" value={date}
                           onChange={handleDateChange}/>
                    <TextField id="select" label="Tag" value={tag} select onChange={handleTagChange}>
                        {serviceTags.map((t) =>{
                            return <MenuItem key={t._id} value={t.name}>{t.name}</MenuItem>
                        })}
                    </TextField>

                    <ButtonComponent onClick={handleClick} value="Confirm"/>

                </form>

                <Notification type={message.type}
                              message={message.value}
                              isOpen={message.isOpen}
                              duration={5000}
                              onClose={handleMessageClose}/>
            </div>
        </PageLayout>
    )
};

export default ServicesPage;