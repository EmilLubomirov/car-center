import React, {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import PageLayout from "../../components/page-layout";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ButtonComponent from "../../components/button";
import Heading from "../../components/heading";
import styles from "./index.module.css";
import Paper from "@material-ui/core/Paper";
import {addToCart} from "../../utils/cart";
import AuthContext from "../../AuthContext";

const ProductDetailsPage = () =>{

    const [product, setProduct] = useState({});
    const { id } = useParams();
    const context = useContext(AuthContext);

    const getProduct = useCallback(async () => {

        const promise = await fetch(`http://localhost:9999/api/product/${id}`);
        const product = await promise.json();

       setProduct(product);

    }, [id]);

    const handleClick = async () =>{
        await addToCart(id, context.user.id);
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
                <img className={styles.image} src={imageUrl} alt={title}/>

                <Heading type="h4" value={title}/>
                <p className={styles.description}>{description}</p>
                <p>Price: {price} lv.</p>

                <ButtonComponent onClick={handleClick} value="Add to cart">
                    <AddShoppingCartIcon/>
                </ButtonComponent>
            </Paper>
        </PageLayout>
    )
};

export default ProductDetailsPage;