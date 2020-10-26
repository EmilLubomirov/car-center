import React, {useCallback, useContext, useEffect, useState} from "react";
import AuthContext from "../../AuthContext";
import Container from "@material-ui/core/Container";
import LinkComponent from "../../components/link";
import Paper from "@material-ui/core/Paper";

const CartPage = () =>{

    const context = useContext(AuthContext);

    const [products, setProducts] = useState([]);

    const getProducts = useCallback(async () =>{

        const userId = context.user.id;

        const url = `http://localhost:9999/api/cart/?user=${userId}`;
        const promise = await fetch(url);
        const result = await promise.json();

        setProducts(result.products);
    },[context.user.id]);

    useEffect(() =>{
        getProducts();
    },[getProducts]);

    return (

        <Container maxWidth="md">
                <div>
                    {products.isEmpty ? <h3>The cart is empty</h3> :
                        products.map((p, index) =>{
                            const {
                                _id,
                                title,
                                price,
                                imageUrl
                            } = p.product;

                            return (
                                <Paper key={_id}>
                                    <LinkComponent path={`/product/${_id}`}>
                                        <img src={imageUrl} alt={title}/>
                                        <p>{title}</p>
                                    </LinkComponent>
                                    <p>Price: {price} lv.</p>
                                </Paper>
                            );
                        })}
                </div>
        </Container>
    )
};

export default CartPage;