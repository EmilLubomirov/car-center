import React, {useEffect, useState} from "react";
import {useLocation, useParams, useHistory, Redirect} from "react-router-dom";
import Heading from "../../components/heading";
import Input from "../../components/input";
import ButtonComponent from "../../components/button";
import Notification from "../../components/notification";
import {MESSAGES, MESSAGE_TYPES} from "../../utils/constants";
import Paper from "@material-ui/core/Paper";
import styles from "./index.module.css";

const OrderPage = () =>{

    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState({
        isOpen: false,
        value: "",
        type: ""
    });

    const location = useLocation();
    const { totalPrice } = location.state ? location.state || 0 : 0;

    const params = useParams();
    const history = useHistory();

    const handleFirstNameChange = (e) =>{
        setFirstName(e.target.value);
    };

    const handleSurnameChange = (e) =>{
        setSurname(e.target.value);
    };

    const handleEmailChange = (e) =>{
        setEmail(e.target.value);
    };

    const handlePhoneNumberChange = (e) =>{
        setPhoneNumber(e.target.value);
    };

    const handleAddressChange = (e) =>{
      setAddress(e.target.value);
    };

    const handleMessageClose = () =>{
        setMessage({
            ...message,
            isOpen: false
        })
    };

    const handleSubmit = async () =>{
        const { products } = location.state;

        const userId = params.userId;

        if (firstName.trim() === '' ||
            surname.trim() === '' ||
            email.trim() === '' ||
            phoneNumber.trim() === '' ||
            address.trim() === ''){

            setMessage({
                isOpen: true,
                value: MESSAGES.inputFieldsEmpty,
                type: MESSAGE_TYPES.error
            });

            return;
        }

        const url = `http://localhost:9999/api/order/make-order`;
        const headers =  { 'Content-Type': 'application/json' };

        const body = JSON.stringify({
            userId,
            products,
            firstName,
            surname,
            email,
            phoneNumber,
            address,
            totalPrice
        });

        const response = await fetch(url, {
            method: "POST",
            headers,
            body
        });

        if (response.status > 201){
            setMessage({
                isOpen: true,
                value: MESSAGES.orderFailure,
                type: MESSAGE_TYPES.error
            });
        }

        else {
            history.push('/', {
                message: MESSAGES.successfulOrder,
                type: MESSAGE_TYPES.success
            });
        }
    };

    return(
        !location.state ? (
            <Redirect to="/error"/>
        ): (
            <Paper className={styles.container}>
                <div className={styles.wrapper}>
                    <Heading type="h4" value="Order details"/>

                    <form className={styles.form}>
                        <Input label="First name" type="text" id="firstName" value={firstName}
                               onChange={handleFirstNameChange}/>
                        <Input label="Surname" type="text" id="surname" value={surname}
                               onChange={handleSurnameChange}/>
                        <Input label="Email" type="email" id="email" value={email}
                               onChange={handleEmailChange}/>
                        <Input label="Phone" type="tel" id="phoneNumber" value={phoneNumber}
                               onChange={handlePhoneNumberChange}/>
                        <Input label="Address" type="text" id="address" value={address}
                               onChange={handleAddressChange}/>
                        <p className={styles.price}>Total price: {totalPrice} lv.</p>

                        <ButtonComponent size="large" value="Finish"
                                         onClick={handleSubmit}/>
                    </form>

                    <Notification type={message.type}
                                  message={message.value}
                                  isOpen={message.isOpen}
                                  duration={5000}
                                  onClose={handleMessageClose}/>
                </div>
            </Paper>
        )
    )
};

export default OrderPage;