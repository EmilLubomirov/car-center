import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Heading from "../../components/heading";
import Input from "../../components/input";
import ButtonComponent from "../../components/button";
import {TextField, MenuItem} from "@material-ui/core";
import {openUploadWidget} from "../../utils/cloudinaryService";
import {CloudinaryContext} from "cloudinary-react"
import Notification from "../../components/notification";
import {getProductTags} from "../../utils/product-tag";
import Paper from "@material-ui/core/Paper";
import  {MESSAGES} from "../../utils/constants";
import styles from "./index.module.css";

const AddProductPage = () =>{

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [tag, setTag] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [tags, setTags] = useState([]);
    const [message, setMessage] = useState({
        isOpen: false,
        value: "",
        type: ""
    });

    const history = useHistory();

    const handleTitleChange = (e) =>{
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) =>{
        setDescription(e.target.value);
    };

    const handleQuantityChange = (e) =>{
        setQuantity(e.target.value);
    };

    const handlePriceChange = (e) =>{
        setPrice(e.target.value);
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

    const handleSubmit = (e) =>{

        e.preventDefault();

        console.log(tag);

        fetch("http://localhost:9999/api/product/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                quantity,
                price,
                tag,
                imageUrl
            })
        }).then(response => {

            if (response.status === 200){
                history.push('/', {
                    message,
                    type: "success"
                });
            }

            else{
                setMessage({
                    isOpen: true,
                    value: MESSAGES.productCreationFailure,
                    type: "error"
                });
            }
        })

    };

    const beginUpload = tag => {

        const uploadOptions = {
            cloudName: process.env.REACT_APP_CLOUD_NAME,
            tags: [tag],
            uploadPreset: process.env.REACT_APP_UPLOAD_PRESET
        };

        openUploadWidget(uploadOptions, (error, photos) => {
            if (!error) {

                if(photos.event === "success"){
                    setImageUrl(photos.info.secure_url);
                }
            } else {
                console.log(error);
            }
        });
    };

    useEffect(() =>{
        getProductTags().then(tags => {
            setTags(tags);
        });
    }, []);

    return (
        <PageLayout>
            <Paper className={styles.container}>
                <div className={styles.wrapper}>
                    <Heading type="h4" value="Add Product"/>

                    <CloudinaryContext cloudName={process.env.REACT_APP_CLOUD_NAME}>
                        <form className={styles.form}>
                            <Input label="Title" type="text" id="title" value={title}
                                   onChange={handleTitleChange}/>
                            <Input label="Description" type="text" isTextArea={true} id="description" value={description}
                                   onChange={handleDescriptionChange}/>
                            <Input label="Quantity" type="number" id="quantity" value={quantity}
                                   onChange={handleQuantityChange}/>
                            <Input label="Price (lv.)" type="number" id="price" value={price}
                                   onChange={handlePriceChange}/>

                            <ButtonComponent color="default" value="Upload" onClick={() => beginUpload(tag)}/>

                            <TextField className={styles.tag} id="select" label="Tag" value={tag} select onChange={handleTagChange}>
                                {tags.map((t) =>{
                                    return <MenuItem key={t._id} value={t.name}>{t.name}</MenuItem>
                                })}
                            </TextField>

                            <div className={styles.button}>
                                <ButtonComponent value="Save"
                                                 onClick={handleSubmit}/>
                            </div>
                        </form>
                    </CloudinaryContext>

                    <Notification type={message.type}
                                  message={message.value}
                                  isOpen={message.isOpen}
                                  duration={5000}
                                  onClose={handleMessageClose}/>
                </div>
            </Paper>
        </PageLayout>
    )
};

export default AddProductPage;