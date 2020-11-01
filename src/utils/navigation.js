const getNavigation = (user) =>{

    const commonLinks = [
        {
            title: "Store",
            path: "/"
        },
        {
            title: "Services",
            path: "/services"
        },
        {
            title: "About",
            path: "/about"
        },
        {
            title: "Contacts",
            path: "/contacts"
        },
    ];

    const guestLinks = [
        ...commonLinks,
        {
            title: "Login",
            path: "/login"
        },
        {
            title: "Register",
            path: "/register"
        }
    ];

    const userLinks = [
        ...commonLinks,
        {
            title: "Cart",
            path: `/cart/${user ? user.id : null}`
        },
    ];

    const adminLinks = [
        ...commonLinks,
        {
            title: "Add product",
            path: "/add-product"
        },
        {
            title: "Cart",
            path: `/cart/${user ? user.id : null}`
        },
    ];

    if (!user){
        return guestLinks;
    }

    return user.isAdmin ? adminLinks : userLinks;
};

export default getNavigation;