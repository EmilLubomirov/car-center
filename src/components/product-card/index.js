import React from "react";
import { Card, CardActionArea, CardMedia, CardContent, CardActions } from "@material-ui/core";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Heading from "../heading";
import LinkComponent from "../link";
import ButtonComponent from "../button";


const ProductCard = ({imageUrl, title, price, id}) =>{

    return (
        <div>
            <Card>
                <LinkComponent path={`/product/${id}`}>
                    <CardActionArea>
                        <CardMedia
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
                    <ButtonComponent color="primary" value="Add to cart">
                        <AddShoppingCartIcon/>
                    </ButtonComponent>
                </CardActions>
            </Card>
        </div>
    )
};

export default ProductCard;