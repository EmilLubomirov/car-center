import {getCookie} from "./cookie";

const authCookieName = "x-auth-token";

export const authenticate = (url, headers, body, onSuccess, onFailure) =>{

    fetch(url, {
        method: "POST",
        headers,
        body
    }).then(response => {

        if (response.status !== 200) {
            onFailure(response.statusText);
            return;
        }

        const authToken = response.headers.get("Authorization");
        document.cookie = `${authCookieName}=${authToken}`;

        onSuccess(response);

    }).catch(e => onFailure(e));
};

export const getLoggedInUser = async () =>{

    const authToken = getCookie(authCookieName) || "";
    const headers =  { 'Content-Type': 'application/json', "authorization": authToken};

    const promise = await  fetch("http://localhost:9999/api/user/verifyLogin", {
        method: "POST",
        headers,
    });

    return await promise.json();
};