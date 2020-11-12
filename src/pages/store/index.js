import React, {useCallback, useEffect, useRef, useState} from "react";
import {useLocation, useHistory} from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Heading from "../../components/heading";
import ProductCard from "../../components/product-card";
import Grid from "@material-ui/core/Grid";
import Notification from "../../components/notification";
import PaginationComponent from "../../components/pagination";
import {PRODUCT} from "../../utils/constants";
import styles from "./index.module.css";
import {getProductTags} from "../../utils/product-tag";
import FormGroup from "@material-ui/core/FormGroup";
import CheckboxComponent from "../../components/checkbox";
import LoadingBar from "../../components/loading-bar";

const StorePage = () =>{

    const [pageCount, setPageCount] = useState(1);
    const [products, setProducts] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] =
        useState(JSON.parse(sessionStorage.getItem("tags")) || []);

    const location = useLocation();
    const { state } = location;


    const [message, setMessage] = useState({
        isOpen: state ? !!state.message : false,
        value: state ? state.message || "" : "",
        type: state ? state.type || "" : ""
    });

    const [isLoading, setLoading] = useState(true);

    const history = useHistory();
    let isCancelled = useRef(false);

    const getProducts = useCallback(async (skip, limit, selectedTags) =>{

        const url = `http://localhost:9999/api/product`;
        const headers =  { 'Content-Type': 'application/json' };

        const body = JSON.stringify({
            selectedTags,
            skip,
            limit
        });

        const promise = await fetch(url, {
            method: "POST",
            headers,
            body
        });

        let result = await promise.json();

        if (!isCancelled.current){
            if (selectedTags.length > 0){
                const actualPageCount = Math.ceil(result.length / PRODUCT.MAX_PRODUCTS_BY_PAGE);
                setPageCount(actualPageCount);
                result = result.slice(skip, skip + limit);
            }

            setProducts(result);
        }
    }, []);

    const getPageCount = useCallback(async () =>{

        const promise = await fetch("http://localhost:9999/api/product/count");
        const result = await promise.json();

        const actualPageCount = Math.ceil(result.count / PRODUCT.MAX_PRODUCTS_BY_PAGE);

        if (!isCancelled.current){
            setPageCount(actualPageCount);
        }
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

    const handleChange = (e) => {

        const { checked, value } = e.target;

        if (checked){
            const updated = [...selectedTags, value];
            setSelectedTags(updated);
        }

        else{
            const filtered = selectedTags.filter(tag => tag !== value);
            setSelectedTags(filtered);
        }
    };

    useEffect(() => {
        getPageCount();
    }, [getPageCount]);

    useEffect(() => {
        if (selectedTags.length === 0 ||
            selectedTags.length === tags.length){
            getPageCount();
        }

        sessionStorage.setItem("tags", JSON.stringify(selectedTags));
        history.push('/');

    }, [selectedTags, getPageCount, history, tags.length]);

    useEffect(() => {
        getProductTags().then(tags => {

            if (!isCancelled.current){
                setTags(tags);
                setLoading(false);
            }
        });
    }, []);

    useEffect(() =>{
        const selectedPage = parseInt(location.search.split('=')[1]) || 1;

        let skip = (selectedPage - 1) * PRODUCT.MAX_PRODUCTS_BY_PAGE;
        let limit = PRODUCT.MAX_PRODUCTS_BY_PAGE;

        getProducts(skip, limit, selectedTags);
    }, [getProducts, location.search, selectedTags]);

    useEffect(() => {
        return () => {
            isCancelled.current = true;
        }
    }, []);

    return (
        <PageLayout>
            {
                isLoading ? (
                    <div className={styles.loader}>
                        <LoadingBar type="spin" color="black" width="8%" height="8%"/>
                    </div>
                ) : (
                    <div>
                        <div className={styles.wrapper}>

                            <div className={styles.heading}>
                                <Heading type="h4" value="Products"/>
                            </div>

                            <div className={styles.selection}>
                                <FormGroup>
                                    {tags.map(t => {
                                        return <CheckboxComponent key={t._id} value={t.name} color="primary"
                                                                  isChecked={selectedTags.includes(t.name)}
                                                                  handleChange={handleChange}/>
                                    })}
                                </FormGroup>
                            </div>

                            <div className={styles.products}>
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
                        </div>

                        <Notification type={message.type}
                                      message={message.value}
                                      isOpen={message.isOpen}
                                      duration={5000}
                                      size="medium"
                                      onClose={handleMessageClose}/>

                        <div className={styles.pagination}>
                            <PaginationComponent pageCount={pageCount} pageUrl="/" size="large"/>
                        </div>
                    </div>
                )
            }
        </PageLayout>
    )
};

export default StorePage;