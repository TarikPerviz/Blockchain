# Backend: Solidity

This is the contract that we used in order to develop our backend.\
An an outline to what the application can and cannot do, here is the quick rundown:
- The user will, upon loading the application for the first time, be prompted with selecting if he wants to be a merchant or a buyer. They can both buy cars but only merchants can sell them
- Upon selecting a role, the user will not be prompted with this screen again on further accesses, since the system will use a function to check if the user is already registered, regardless of his status.
- Users and Merchants can view all the avaliable cars on the marketplace, as well as view the cars they currently have owned.
- Merchants can also view which cars they have for sale
- Users can buy cars by paying a certain fee to the merchants. Once bought, the car is not for sale anymore and is located inside the users car collection
- The cars can be browsed as a whole, and clicking on a car opens up more details about the car
- Only merchants can buy and remove cars from the system. They can also only remove cars which are currently not rented out.