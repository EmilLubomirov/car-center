import React, {useCallback, useEffect, useState} from "react";
import PageLayout from "../../components/page-layout";
import Heading from "../../components/heading";
import ProductCard from "../../components/product-card";
import Grid from "@material-ui/core/Grid";

const StorePage = () =>{

    const [products, setProducts] = useState([]);

    const getProducts = useCallback(async () =>{

        const promise = await fetch("http://localhost:9999/api/product");
        const result = await promise.json();

       setProducts(result);
    }, []);

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
                                         id={product._id}/>
                        </Grid>)
                    })}
                </Grid>
            </div>
        </PageLayout>
    )
};

export default StorePage;