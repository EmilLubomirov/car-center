import React from "react";
import Grid from "@material-ui/core/Grid";
import ProductCard from "../product-card";
import Heading from "../heading";

const ProductCards = ({products, productsEmpty, handleError}) => {

    return (
        <div>
            <Grid   container
                    direction="row"
                    alignItems="center"
                    spacing={4}>
                {
                    products.map(product => {
                        return (<Grid key={product._id} item xs={6} sm={3}>
                            <ProductCard imageUrl={product.imageUrl}
                                         title={product.title}
                                         price={product.price}
                                         id={product._id}
                                         handleError={handleError}/>
                        </Grid>)
                    })
                }

                {
                    productsEmpty ? (
                        <Heading type="h4" value="No products were found"/>
                    ) : null
                }
            </Grid>
        </div>
    )
};

export default ProductCards;