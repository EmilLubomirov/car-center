import React, {useCallback, useEffect, useRef, useState} from "react";
import {useHistory, useParams} from "react-router-dom"
import PageLayout from "../../components/page-layout";
import Heading from "../../components/heading";
import Grid from "@material-ui/core/Grid";
import ButtonComponent from "../../components/button";
import LoadingBar from "../../components/loading-bar";
import CartProducts from "../../components/cart-products";
import styles from "./index.module.css";

const CartPage = () =>{

    const [products, setProducts] = useState([]);
    const [productsPrice, setProductsPrice] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [delivery, setDelivery] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const params = useParams();
    const history = useHistory();

    let isCancelled = useRef(false);

    const getProducts = useCallback(async () =>{

        const userId = params.userId;

        const url = `http://localhost:9999/api/cart/?user=${userId}`;
        const promise = await fetch(url);
        const result = await promise.json();

        const cartProducts = result.products ? result.products : [];

        if (!isCancelled.current){
            setProducts(cartProducts);
        }
    }, [isCancelled, params.userId]);

    const getDelivery = useCallback(async (name) =>{

        const url = `http://localhost:9999/api/delivery/?name=${name}`;
        const promise = await fetch(url);
        const result = await promise.json();

        if (!isCancelled.current){
            setDelivery(result);
        }
    }, [isCancelled]);

    const handleClear = useCallback(async (productId) =>{

        const { userId } = params;

        const url = `http://localhost:9999/api/cart/remove-from-cart`;
        const headers =  { 'Content-Type': 'application/json' };

        const body = JSON.stringify({
            userId,
            productId
        });

        const promise = await fetch(url, {
            method: "DELETE",
            headers,
            body
        });

        const result = await promise.json();

        setProducts(result.products);
    }, [params]);

    const handleShoppingClick = () =>{
        history.push('/');
    };

    const handleOrderClick = () =>{
        history.push(`/order/${params.userId}`, {
            products,
            productsPrice,
            totalPrice,
            deliveryName: delivery.name
        });
    };

    useEffect(() =>{

        const price = products.map(p => p.product.price * p.quantity)
            .reduce((acc, curr) => acc + curr, 0);

        setProductsPrice(price.toFixed(2));
    }, [products]);

    useEffect(() =>{
        getProducts().then(() => {
            setLoading(false);
        });
    },[getProducts]);

    useEffect(() => {

        const productsPriceNum = parseFloat(productsPrice);

        if (!isNaN(productsPriceNum) && productsPriceNum > 0){
            if (productsPriceNum < 50){
                getDelivery("Standard");
            }

            else {
                getDelivery("Free");
            }

            setTotalPrice(productsPriceNum.toFixed(2));
        }
    }, [productsPrice, getDelivery]);

    useEffect(() => {

        if (delivery){
            const endPrice = Number(productsPrice) + delivery.price;
            setTotalPrice(endPrice.toFixed(2));
        }

    }, [delivery, productsPrice]);

    useEffect(() => {
        return () => {
            isCancelled.current = true;
        };
    }, []);

    return (
        <PageLayout>
            {
                isLoading ? (
                    <div className={styles.loader}>
                        <LoadingBar type="spin" color="black" width="8%" height="8%"/>
                    </div> ) :(
                    <div>
                        <Grid className={styles.items} container>
                            <Grid item xs={12} sm={8}>
                                {products.length === 0 ? (
                                        <div className={styles["empty-cart"]}>
                                            <Heading type="h3" value="The cart is empty"/>
                                            <ButtonComponent onClick={handleShoppingClick} value="Continue Shopping"/>
                                        </div>) :
                                    (
                                        <CartProducts products={products}
                                                   userId={params.userId}
                                                   handleUpdate={getProducts}
                                                   handleClear={handleClear}/>)
                                }
                            </Grid>
                            <Grid>
                                <div>
                                    {
                                        products.length > 0 ? (
                                            <div className={styles["price-section"]}>
                                                <div>
                                                    <strong>Products price: {productsPrice}</strong>
                                                </div>
                                                <div className={styles["total-price"]}>
                                                    <strong>
                                                        Total price: {totalPrice}
                                                        <small>&#160;(*delivery included)</small>
                                                    </strong>
                                                </div>
                                                <div className={styles["order-button"]}>
                                                    <ButtonComponent onClick={handleOrderClick} value="Make order"/>
                                                </div>
                                            </div>) : null
                                    }
                                    {
                                        products.length > 0 ? (
                                            <div className={styles["shopping-button"]}>
                                                <ButtonComponent onClick={handleShoppingClick} value="Continue Shopping"/>
                                            </div>) : null
                                    }
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                )
            }
        </PageLayout>
    )
};

export default CartPage;