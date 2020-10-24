import React, {useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import PageLayout from "../../components/page-layout";
import styles from "../login/index.module.css";
import Heading from "../../components/heading";
import Input from "../../components/input";
import Box from "@material-ui/core/Box";
import ButtonComponent from "../../components/button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {openUploadWidget} from "../../utils/cloudinaryService";
import {CloudinaryContext} from "cloudinary-react"
import Notification from "../../components/notification";
import cloudData from "../../utils/cloudinary";

const AddProductPage = (callback, deps) =>{

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

        fetch("http://localhost:9999/api/product", {
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
                history.push('/');
            }

            else{
                setMessage({
                    isOpen: true,
                    value: "Product creation failed! Try again!",
                    type: "error"
                });
            }
        })

    };

    const beginUpload = tag => {

        const {
            cloudName,
            uploadPreset
        } = cloudData;

        const uploadOptions = {
            cloudName,
            tags: [tag],
            uploadPreset
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

    const getProductTags = useCallback(async () => {

        const url = 'http://localhost:9999/api/tag';

        const promise = await fetch(url);
        const tags = await promise.json();
        setTags([...tags]);
    }, []);

    useEffect(() =>{
        getProductTags();
    }, [getProductTags]);

    return (
        <PageLayout>
            <div className={styles.wrapper}>
                <Heading type="h4" value="Add Product"/>

                <CloudinaryContext cloudName={cloudData.cloudName}>
                    <form>
                        <Input label="Title" type="text" id="title" value={title}
                               onChange={handleTitleChange}/>
                        <Input label="Description" type="text" isTextArea={true} id="description" value={description}
                               onChange={handleDescriptionChange}/>
                        <Input label="Quantity" type="number" id="quantity" value={quantity}
                               onChange={handleQuantityChange}/>
                        <Input label="Price (lv.)" type="number" id="price" value={price}
                               onChange={handlePriceChange}/>

                        <ButtonComponent color="default" value="Upload" onClick={() => beginUpload(tag)}/>

                        <TextField id="select" label="Tag" value={tag} select onChange={handleTagChange}>
                            {tags.map((t) =>{
                                return <MenuItem key={t._id} value={t.name}>{t.name}</MenuItem>
                            })}
                        </TextField>

                        <Box textAlign="center">
                            <ButtonComponent value="Save"
                                             onClick={handleSubmit}/>
                        </Box>
                    </form>
                </CloudinaryContext>

                <Notification type={message.type}
                              message={message.value}
                              isOpen={message.isOpen}
                              duration={5000}
                              onClose={handleMessageClose}/>
            </div>
        </PageLayout>
    )
};

export default AddProductPage;