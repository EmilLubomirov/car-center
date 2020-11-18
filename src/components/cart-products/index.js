import React from "react";
import {CART} from "../../utils/constants";
import CartProduct from "../cart-product";

const CartProducts = ({products, userId, handleUpdate, handleClear}) => {

    return (
        <div>
            {
                products.map(p =>{
                    const {
                        _id,
                        title,
                        price,
                        quantity,
                        imageUrl
                    } = p.product;

                    const MAX_PRODUCT_QUANTITY = CART.MAX_PRODUCT_QUANTITY;

                    const maxQuantity = MAX_PRODUCT_QUANTITY > quantity ?
                        quantity : MAX_PRODUCT_QUANTITY;

                    const requestedQuantity = p.quantity >  maxQuantity ?
                        maxQuantity  : p.quantity;

                    return (
                        <CartProduct key={_id}
                                     imageUrl={imageUrl}
                                     title={title}
                                     price={price}
                                     requestedQuantity={requestedQuantity}
                                     maxQuantity={maxQuantity}
                                     productId={_id}
                                     userId={userId}
                                     handleUpdate={handleUpdate}
                                     handleClear={() => handleClear(_id)}/>
                    );
                })}
            }
        </div>
    )
};

export default CartProducts;