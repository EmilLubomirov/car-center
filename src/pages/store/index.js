import React, {useCallback, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Heading from "../../components/heading";
import ProductCard from "../../components/product-card";
import Grid from "@material-ui/core/Grid";
import Notification from "../../components/notification";
import PaginationComponent from "../../components/pagination";
import {PRODUCT} from "../../utils/constants";
import styles from "./index.module.css";

const StorePage = () =>{

    const [pageCount, setPageCount] = useState(1);
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState({
        isOpen: false,
        value: "",
        type: ""
    });

    const location = useLocation();

    const getProducts = useCallback(async (skip, limit) =>{

        const promise = await fetch(`http://localhost:9999/api/product?skip=${skip}&limit=${limit}`);
        const result = await promise.json();

       setProducts(result);
    }, []);

    const getPageCount = useCallback(async () =>{

        const promise = await fetch("http://localhost:9999/api/product/count");
        const result = await promise.json();

        const actualPageCount = Math.ceil(result.count / PRODUCT.MAX_PRODUCTS_BY_PAGE);
        setPageCount(actualPageCount);
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

    useEffect(() => {
        getPageCount();
    }, [getPageCount]);

    useEffect(() =>{
        const selectedPage = parseInt(location.search.split('=')[1]) || 1;

        const skip = (selectedPage - 1) * PRODUCT.MAX_PRODUCTS_BY_PAGE;
        const limit = PRODUCT.MAX_PRODUCTS_BY_PAGE;

        getProducts(skip, limit);
    }, [getProducts, location.search]);

    return (
        <PageLayout>
            <div className={styles.wrapper}>
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

             <div className={styles.pagination}>
                 <PaginationComponent pageCount={pageCount} pageUrl="/" size="large"/>
             </div>
        </PageLayout>
    )
};

export default StorePage;