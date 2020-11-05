export const getProductTags = async () => {

    const url = 'http://localhost:9999/api/product-tag';
    const promise = await fetch(url);

    return await promise.json();
};