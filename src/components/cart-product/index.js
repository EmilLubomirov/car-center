import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import LinkComponent from "../link";
import ClearIcon from '@material-ui/icons/Clear';
import styles from "./index.module.css";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const CartProduct = ({ imageUrl, title, price, neededQuantity, availableQuantity, productId, handleClear }) =>{

    const [amount, setAmount] = useState(neededQuantity);
    const [productPrice, setProductPrice] = useState(0);

    const handleAmountChange = (e) =>{
      setAmount(e.target.value);
    };

    useEffect(() =>{
        setProductPrice(parseInt(amount) * price);
    }, [amount, price]);

    return (
        <Paper className={styles.container}>
            <figure className={styles.item}>
                <img src={imageUrl} alt={title}/>
            </figure>
            <TextField id="select" label="Tag" value={amount} select onChange={handleAmountChange}>
                {
                   [...Array(availableQuantity).keys()].slice(1).map(val =>{
                       return <MenuItem key={val} value={val}>{val}</MenuItem>
                   })
               }
            </TextField>
            <div className={styles.item}>
                <LinkComponent path={`/product/${productId}`}>
                    <span>{title}</span>
                </LinkComponent>
            </div>
            <strong>{productPrice} lv.</strong>
            <ClearIcon className={styles.clearIcon} onClick={handleClear}/>
        </Paper>
    )
};

export default CartProduct;