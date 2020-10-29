import React, {useCallback, useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import LinkComponent from "../link";
import ClearIcon from '@material-ui/icons/Clear';
import styles from "./index.module.css";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const CartProduct = ({ imageUrl, title, price, requestedQuantity, availableQuantity, productId, userId, handleClear }) =>{

    const [amount, setAmount] = useState('');
    const [productEndPrice, setProductEndPrice] = useState('');

    const handleAmountChange = (e) =>{
      setAmount(e.target.value);
    };

    const updateQuantityInDb = useCallback(async (quantity) =>{

        if (quantity){
            const url = 'http://localhost:9999/api/cart/update-quantity';
            const headers = { 'Content-Type': 'application/json' };

            const body = JSON.stringify({
                productId,
                userId,
                quantity
            });


            await fetch(url, {
                method: "PUT",
                headers,
                body
            });
        }
    }, [productId, userId]);

    useEffect(() =>{
        const currentPrice = parseInt(amount) * price;
        setProductEndPrice(currentPrice.toFixed(2));

        updateQuantityInDb(amount);

    }, [amount, price, updateQuantityInDb]);

    useEffect(  () =>{
        setAmount(requestedQuantity);
    }, [requestedQuantity]);

    return (
        <Paper className={styles.container}>
            <figure className={styles.item}>
                <img src={imageUrl} alt={title}/>
            </figure>
            <TextField id="select" label="Qty" value={amount} select onChange={handleAmountChange}>
                {
                    [...Array(availableQuantity + 1).keys()].slice(1).map(val =>{
                        return <MenuItem key={val} value={val}>{val}</MenuItem>
                    })
                }
            </TextField>
            <div className={styles.item}>
                <LinkComponent path={`/product/${productId}`}>
                    <span>{title}</span>
                </LinkComponent>
            </div>
            <strong>{productEndPrice} lv.</strong>
            <ClearIcon className={styles.clearIcon} onClick={handleClear}/>
        </Paper>
    )
};

export default CartProduct;