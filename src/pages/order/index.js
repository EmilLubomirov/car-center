import React, {useEffect, useState} from "react";
import {useLocation, useParams, useHistory} from "react-router-dom";
import Heading from "../../components/heading";
import Input from "../../components/input";
import Box from "@material-ui/core/Box";
import ButtonComponent from "../../components/button";
import Notification from "../../components/notification";

const OrderPage = () =>{

    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [totalPrice, setTotalPrice] = useState('');

    const location = useLocation();
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

    useEffect(() =>{
        setTotalPrice(location.state.totalPrice || []);
    }, [totalPrice, location.state.totalPrice]);

    const handleSubmit = async () =>{
        const { products } = location.state;

        const userId = params.userId;

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


        const promise = await fetch(url, {
            method: "POST",
            headers,
            body
        });

        await promise.json();
        history.push('/');
    };

    return(
        <div>
            <Heading type="h3" value="Order details"/>

            <form>
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
                       <p>Total price: {totalPrice} lv.</p>
                <Box textAlign="center">
                    <ButtonComponent value="Finish"
                                     onClick={handleSubmit}/>
                </Box>
            </form>
        </div>
    )
};

export default OrderPage;