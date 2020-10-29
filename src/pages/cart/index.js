import React, {useCallback, useContext, useEffect, useState} from "react";
import AuthContext from "../../AuthContext";
import Container from "@material-ui/core/Container";
import PageLayout from "../../components/page-layout";
import CartProduct from "../../components/cart-product";
import Heading from "../../components/heading";

const CartPage = () =>{

    const context = useContext(AuthContext);

    const [products, setProducts] = useState([]);

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
            method: "POST",
            headers,
            body
        });

        const result = await promise.json();

        setProducts(result.products);
    }, [context.user.id]);

    useEffect(() =>{
        getProducts();
    },[getProducts]);

    return (
        <PageLayout>
            <Container maxWidth="md">
                <div>
                    {products.length === 0 ? (<Heading type="h3" value="The cart is empty"/>) :
                        products.map((p, index) =>{
                            const {
                                _id,
                                title,
                                price,
                                quantity,
                                imageUrl
                            } = p.product;

                            const requestedQuantity = p.quantity;

                            return (
                               <CartProduct key={index}
                                            imageUrl={imageUrl}
                                            title={title}
                                            price={price}
                                            requestedQuantity={requestedQuantity}
                                            availableQuantity={quantity}
                                            productId={_id}
                                            userId={context.user.id}
                                            handleClear={() => handleClear(_id)}/>
                            );
                        })}
                </div>
            </Container>
        </PageLayout>
    )
};

export default CartPage;