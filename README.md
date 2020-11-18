# CAR CENTER

An application where you can 
purchase consumables for your car such as tires, rims, 
motor oil etc.

There is also an opportunity to make an appointment for some car services:
 
- MOT (Ministry Of Transport test)
- Car Wash
- Car Service

There are 3 user roles:
- Guest
- Admin
- User

You should be logged in to 
make an appointment through the service page
and to purchase car products from the store as well.

Users are capable of adding products they liked 
to their shopping cart and making orders from there.
 
If you are authorized as an admin, you are able to add 
items to the store.

##### Setup:
1. `npm install (both in the API and project)` - to install all dependencies
2. `Add .env file in the API provided with:`
    - NODE_ENV
    - PORT
    - DATABASE_URL
    - COOKIE_SECRET
    - TOKEN_SECRET
    
3. `Add .env file in the project with your cloudinary data:`
    - REACT_APP_CLOUD_NAME
    - REACT_APP_UPLOAD_PRESET
4. `npm start (both in the API and project)` - to start the servers locally
5. `open localhost:3000`   
    