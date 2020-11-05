import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom"
import AuthContext from "../../AuthContext";
import PageLayout from "../../components/page-layout";
import CartProduct from "../../components/cart-product";
import Heading from "../../components/heading";
import {CART} from "../../utils/constants";
import ButtonComponent from "../../components/button";
import Grid from "@material-ui/core/Grid";

const CartPage = () =>{

    const context = useContext(AuthContext);
    const history = useHistory();

    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState('');

    const getProducts = useCallback(async () =>{

        const userId = context.user.id;

        const url = `http://localhost:9999/api/cart/?user=${userId}`;
        const promise = await fetch(url);
        const result = await promise.json();

        const cartProducts = result.products ? result.products : [];

        setProducts(cartProducts);
    },[context.user.id]);

    const handleClear = useCallback(async (productId) =>{

        const userId = context.user.id;

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
    }, [context.user.id]);

    const handleShoppingClick = () =>{
        history.push('/');
    };

    const handleOrderClick = () =>{
        history.push(`/order/${context.user.id}`, {
            products,
            totalPrice
        });
    };

    useEffect(() =>{

        const price = products.map(p => p.product.price * p.quantity)
            .reduce((acc, curr) => acc + curr, 0);

        setTotalPrice(price.toFixed(2));
    }, [products]);

    useEffect(() =>{
        getProducts();
    },[getProducts]);

    return (
        <PageLayout>
            <Grid container>
                <Grid item xs={9}>
                    {products.length === 0 ? (<Heading type="h3" value="The cart is empty"/>) :
                        products.map(p =>{
                            const {
                                _id,
                                title,
                                price,
                                quantity,
                                imageUrl
                            } = p.product;

                            const MAX_PRODUCT_QUANTITY = CART.MAX_PRODUCT_QUANTITY;

                            const maxQuantity = MAX_PRODUCT_QUANTITY > quantity ?
                                                quantity : MAX_PRODUCT_QUANTITY;

                            const requestedQuantity = p.quantity >  maxQuantity ?
                                                        maxQuantity  : p.quantity;

                            return (
                               <CartProduct key={_id}
                                            imageUrl={imageUrl}
                                            title={title}
                                            price={price}
                                            requestedQuantity={requestedQuantity}
                                            maxQuantity={maxQuantity}
                                            productId={_id}
                                            userId={context.user.id}
                                            handleUpdate={getProducts}
                                            handleClear={() => handleClear(_id)}/>
                            );
                        })}
                </Grid>
                <Grid>
                    {
                        products.length > 0 ? (
                            <>
                                <strong>Total price: {totalPrice}</strong>
                                <ButtonComponent onClick={handleOrderClick} value="Make order"/>
                            </>) : null
                    }

                    <ButtonComponent onClick={handleShoppingClick} value="Continue Shopping"/>
                </Grid>
            </Grid>
        </PageLayout>
    )
};

export default CartPage;