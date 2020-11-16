import React, {useContext} from "react";
import { Card, CardActionArea, CardMedia, CardContent, CardActions } from "@material-ui/core";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Heading from "../heading";
import LinkComponent from "../link";
import ButtonComponent from "../button";
import AuthContext from "../../AuthContext";
import { addToCart } from "../../utils/cart";
import {MESSAGES} from "../../utils/constants";
import styles from "./index.module.css";

const ProductCard = ({imageUrl, title, price, id, handleError}) =>{

    const context = useContext(AuthContext);

    const handleClick = async () =>{

        const { user } = context;

        if (!user){
            handleError(MESSAGES.userShouldBeLoggedIn);
            return;
        }

        await addToCart(id, context.user.id);
    };

    return (
        <div>
            <Card>
                <LinkComponent path={`/product/${id}`}>
                    <CardActionArea>
                        <CardMedia
                            className={styles.img}
                            component="img"
                            alt={title}
                            image={imageUrl}
                            title={title}
                        />
                        <CardContent>
                            <Heading type="h5" value={title}/>
                            <Heading type="h6" value={`Price: ${price} lv.`}/>
                        </CardContent>
                    </CardActionArea>
                 </LinkComponent>
                <CardActions>
                    <ButtonComponent onClick={handleClick} color="primary" value="Add to cart">
                        <AddShoppingCartIcon/>
                    </ButtonComponent>
                </CardActions>
            </Card>
        </div>
    )
};

export default ProductCard;