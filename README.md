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
to their shopping cart and making an order from there.
 
If you are authorized as an admin, you are able to add 
products to the store. The images of the products are saved in 
Cloudinary.

##### Setup:
1. `npm install` - to install all dependencies
2. `Add .env file in the API provided with 
    Node environment, 
    port, DB url and secret phrase`
3. `Add .env file in the project with your cloudinary data`
4. `npm start` - to start the server locally
5. `open localhost:3000`   
    