import React, {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import PageLayout from "../../components/page-layout";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ButtonComponent from "../../components/button";
import Heading from "../../components/heading";
import styles from "./index.module.css";
import Paper from "@material-ui/core/Paper";
import {addToCart} from "../../utils/cart";
import {MESSAGES} from "../../utils/constants";
import AuthContext from "../../AuthContext";
import Notification from "../../components/notification";

const ProductDetailsPage = () =>{

    const [product, setProduct] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [message, setMessage] = useState({
        isOpen: false,
        value: "",
        type: ""
    });
    const { id } = useParams();
    const context = useContext(AuthContext);

    const getProduct = useCallback(async () => {

        const promise = await fetch(`http://localhost:9999/api/product/${id}`);
        const product = await promise.json();

       setProduct(product);
    }, [id]);

    const handleClick = async () =>{

        const { user } = context;

        if (!user){
            setMessage({
                isOpen: true,
                value: MESSAGES.userShouldBeLoggedIn,
                type: "error"
            });
            return;
        }

        await addToCart(id, context.user.id);
    };

    const handleMessageClose = () =>{
        setMessage({
            ...message,
            isOpen: false
        })
    };

    useEffect(() => {
        getProduct();
    }, [getProduct]);

    const {
        title,
        description,
        price,
        imageUrl,
    } = product;

    return(
        <PageLayout>
            <Paper className={styles.wrapper}>
                <img className={styles.image} src={imageUrl}
                     onLoad={() => setLoading(false)} alt={title}/>

                {
                    isLoading ? null : (
                        <>
                            <div className={styles.title}>
                                <Heading type="h4" value={title}/>
                            </div>
                            <p className={styles.description}>{description}</p>
                            <p className={styles.price}>Price: {price.toFixed(2)} lv.</p>
                            <ButtonComponent onClick={handleClick} value="Add to cart">
                                <AddShoppingCartIcon/>
                            </ButtonComponent>
                        </>
                    )
                }
            </Paper>

            <Notification type={message.type}
                          message={message.value}
                          isOpen={message.isOpen}
                          duration={5000}
                          onClose={handleMessageClose}/>
        </PageLayout>
    )
};

export default ProductDetailsPage;