export const addToCart = async (productId, userId) =>{

    const url = "http://localhost:9999/api/cart/add-to-cart";
    const headers =  { 'Content-Type': 'application/json' };

    const body = JSON.stringify({
        productId,
        userId
    });

    const promise = await fetch(url, {
        method: "POST",
        headers,
        body
    });

   return await promise.json();
};

export const CART_CONSTANTS = {
    MAX_PRODUCT_QUANTITY: 10
};