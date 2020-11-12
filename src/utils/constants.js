const CART = {
    MAX_PRODUCT_QUANTITY: 10
};

const PRODUCT = {
    MAX_PRODUCTS_BY_PAGE: 8
};

const MESSAGES = {
    emptyUsername: "Username should not be empty",
    emptyPassword: "Password should not be empty",
    emptyRePassword: "Repeat password should not be empty",
    passwordsNotMatch: "Passwords do not match",
    userAlreadyExists: "User already exists",
    userNotFound: "No such user found",
    userShouldBeLoggedIn: "You should be logged in first",
    successfulLogin: "Successfully logged in",
    inputFieldsEmpty: "Please, fill in all fields",
    negativeOrZeroQuantity: "Quantity should be greater than 0",
    negativePrice: "Product price should be positive",
    successfulProductCreation: "Successfully add product",
    productCreationFailure: "Product creation failed!",
    serviceAppointmentFailure: "Either data is invalid or empty or date is busy!",
    successfulLogout: "Successfully logged out",
    orderFailure: "Unable to make an order",
    successfulOrder: "Thank you for buying from us"
};

const MESSAGE_TYPES = {
    success: "success",
    error: "error"
};

module.exports = {
    CART,
    PRODUCT,
    MESSAGES,
    MESSAGE_TYPES
};