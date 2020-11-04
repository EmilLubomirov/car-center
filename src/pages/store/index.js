import React, {useCallback, useEffect, useState} from "react";
import PageLayout from "../../components/page-layout";
import Heading from "../../components/heading";
import ProductCard from "../../components/product-card";
import Grid from "@material-ui/core/Grid";
import Notification from "../../components/notification";

const StorePage = () =>{

    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState({
        isOpen: false,
        value: "",
        type: ""
    });

    const getProducts = useCallback(async () =>{

        const promise = await fetch("http://localhost:9999/api/product");
        const result = await promise.json();

       setProducts(result);
    }, []);

    const handleError = (message) =>{
        setMessage({
            isOpen: true,
            value: message,
            type: "error"
        });
    };

    const handleMessageClose = () =>{
        setMessage({
            ...message,
            isOpen: false
        })
    };

    useEffect(() =>{
        getProducts();
    }, [getProducts]);

    return (
        <PageLayout>
            <div>
                <Heading type="h4" value="Products"/>

                <Grid   container
                        direction="row"
                        alignItems="center"
                        spacing={4}>
                    {products.map(product => {
                        return (<Grid key={product._id} item xs={3}>
                            <ProductCard imageUrl={product.imageUrl}
                                         title={product.title}
                                         price={product.price}
                                         id={product._id}
                                         handleError={handleError}/>
                        </Grid>)
                    })}
                </Grid>
            </div>

            <Notification type={message.type}
                          message={message.value}
                          isOpen={message.isOpen}
                          duration={5000}
                          onClose={handleMessageClose}/>
        </PageLayout>
    )
};

export default StorePage;