/**

 The contract here has no relation with the actual project, and it does not have an effect on the project root.
 It is just here to have a closer understanding and have all the parts of the project in one reposiroty.
 The actual, identical, deployed version of this contract can be found at this address:

 Address: 0xa86D0cFe8eeeb3979543b3EA149739A6c9D493fd

 This here just servers as more of an "explanation" rather than deployment.
 Also, the images for the cars are uploaded and located on:

 Images: https://app.pinata.cloud/ipfs/groups/46054e62-4268-4f72-967b-7735e0014188

 */

// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract CarDealership{
    // Enum for various car Engines
    enum Engine{ Diesel, Petrol, Gas, Electric } 

    // Enum for car brands
    enum CarBrand{ BMW, Mercedes, Audi, Volkswagen, Skoda, Ferrari, Lamborghini, Seat, Reanault, Ford, Fiat, Suzuki, Other }

    // The following structure keeps data for the Customers...
    struct Customer{
        uint id;    // ...system incremented ID
        string first_name;
        string last_name;
        string username;
        CarBrand favourite_car_brand;   // ...the users favourite Carbrand selected at the beginning
        address customer_address;
    }

    // The following structure keeps data for the Merchants...
    struct Merchant{
        uint id;    // ...system incremented ID
        string first_name;
        string last_name;
        string username;
        CarBrand favourite_car_brand;   // ..the users favourite Carbrand selected at the beginning
        uint cars_for_Sale;     // ...total number of cars the user has for sale / for rent
        address merchant_address;
    }

    // The following structure keeps data for the Cars...
    struct Car{
        uint id;    // ...system incremented ID
        address merchant_address;   // ...address of the merchant who posted the car
        string name;
        CarBrand brand;
        string model;
        uint production_year;
        uint kilometers;
        bool for_sale;
        Engine engine;
        uint price;     // ...price expressed in WEI
        uint engine_displacement;
        string image_url;   // ...image URL for the car from piniata
    }

    // These are used to simply keep track of the IDs of the items in the blockchain
    uint next_customer_id = 1;
    uint next_merchant_id = 1;
    uint next_car_id = 1;

    // These mappings are used to keep track of...
    mapping(address => bool) public isRegistered;   // ...the users registered in the system already.
    mapping(address => Customer) public customers;  // ...the users registered as a Customer
    mapping(address => Merchant) public merchants;  // ...the users registered as a Merchant
    mapping(address => uint[]) public user_cars;    // ...the users bought cars stored inside an array of their IDs
    mapping(address => uint[]) public merchant_cars;    // ...the merchants cars which he put up for sale
    mapping(uint => Car) public allCars;    // ...all the cars in the system, indicated by their ID, starting from 1

    // Events which we use for logging functions...
    event CustomerAdded(string username, address add);
    event MerchantAdded(string username, address add);
    event CarAdded(string name, uint id, CarBrand brand);

    // This modifier applies only to Merchant accessible functions like deleting and adding cars
    modifier onlyMerchant{
        require(merchants[msg.sender].id != 0, "You are not a merchant, therefore you may not access this funcion!");
        _;
    }

    // This function runs immediately upon loading the UI and checks if the user is already registered inside the system as either a merchant or a customer.
    function checkRegister() public view returns (bool){
        return isRegistered[msg.sender];
    }

    /** 

     The following two functions are called when the user initially sings up to the application
     and needs to select what he wants to be. For the purpose of this project, this action is irreversable
     Essentially, once a user selects to be a metchant/customer, he cannot change the role later. 

     */
    function addCustomer(string memory _first_name, string memory _last_name, string memory _username, CarBrand _brand) public {
        require(bytes(_first_name).length != 0, "First Name must be set!");
        require(bytes(_last_name).length != 0, "Last Name must be set!");
        require(bytes(_username).length != 0, "Username must be set");

        customers[msg.sender] = Customer(next_customer_id, _first_name, _last_name, _username, _brand, msg.sender);
        next_customer_id++;
        isRegistered[msg.sender] = true;

        emit CustomerAdded(_first_name, msg.sender);
    }

    function addMerchant(string memory _first_name, string memory _last_name, string memory _username, CarBrand _brand) public {
        require(bytes(_first_name).length != 0, "First Name must be set!");
        require(bytes(_last_name).length != 0, "Last Name must be set!");
        require(bytes(_username).length != 0, "Username must be set");

        merchants[msg.sender] = Merchant(next_merchant_id, _first_name, _last_name, _username, _brand, 0, msg.sender);
        next_merchant_id++;
        isRegistered[msg.sender] = true;

        emit MerchantAdded(_first_name, msg.sender);
    }

    // Considering that the UI only has subtle changes if the user is a Merchant, this function serves as a check to see if the user is a merchant and returns true in case he is
    function isMerchant() public view returns(bool){
        if(merchants[msg.sender].id != 0){
            return true;
        } else {
            return false;
        }
    }

    /**
     The following functions are all CRUD related operations for the cars themselves (excluding edit for now)
     */
    function loadAvailableCars() public view returns(Car[] memory){
        // In case the ID is at 1, no car has been added so we can return an empty array...
        if(next_car_id == 1){
            return new Car[](0);
        }

        // ...otherwise, iterate over the actual cars:
        Car[] memory returnCars = new Car[](next_car_id);
        for(uint i = 0; i < next_car_id; i++){
            if(allCars[i+1].for_sale != false){
                returnCars[i] = allCars[i + 1];
            }
        }
        return returnCars;
    }

    function loadCarById(uint _carId) public view returns(Car memory){
        require(allCars[_carId].id != 0, "Car ID does not exist in the system");

        Car memory returnCar = allCars[_carId];
        return returnCar;
    }

    function buyCar(uint _carId) public payable{
        require(allCars[_carId].id != 0, "Car ID does not exist in the system");
        require(allCars[_carId].for_sale == true, "Car is not for sale!");
        require(msg.value == allCars[_carId].price, "Incorrect price sent");

        // Pay the indicated price to the respective merchant
        address payable merchant = payable(allCars[_carId].merchant_address);
        merchant.transfer(msg.value);

        // Set the for sale status of the car to be false
        allCars[_carId].for_sale = false;

        // Add the bought car to the users collection
        user_cars[msg.sender].push(_carId);
    }

    function removeCarFromInventory(uint _carId) public{
        require(allCars[_carId].id != 0, "Car ID does not exist in the system");

        allCars[_carId].for_sale = true;
        for(uint i = 0; i < user_cars[msg.sender].length; i++){
            if(user_cars[msg.sender][i] == _carId){
                user_cars[msg.sender][i] = user_cars[msg.sender][user_cars[msg.sender].length - 1];
                user_cars[msg.sender].pop();
                break; 
            }
        }
    }

    function addCarForSale(string memory _name, CarBrand _brand, string memory _model, uint _prod_year, uint _kilometers, Engine _engine, uint _price, uint _displacement, string memory _image_url) public onlyMerchant{
        require(bytes(_name).length != 0, "Name cannot be empty!");
        require(bytes(_model).length != 0, "Model cannot be empty!");
        require(_prod_year > 0, "Production year cannot be null or less!");
        require(_displacement > 0, "Engine displacement cannot be null or less!");
        require(_price > 0, "Price cannot be null or less!");

        Car memory newCar = Car(next_car_id, msg.sender, _name, _brand, _model, _prod_year, _kilometers, true, _engine, _price, _displacement, _image_url);
        allCars[next_car_id] = newCar;
        merchant_cars[msg.sender].push(next_car_id);

        emit CarAdded(_name, next_car_id, _brand);
        next_car_id++;
    }

    function deleteCar(uint _carId) public onlyMerchant {
        require(allCars[_carId].id != 0, "Car ID does not exist in the system");
        require(allCars[_carId].for_sale == true, "Car is already rented! It cannot be removed until the user has returned it!");

        delete allCars[_carId];
        for(uint i = 0; i < merchant_cars[msg.sender].length; i++){
            if(merchant_cars[msg.sender][i] == _carId){
                merchant_cars[msg.sender][i] = merchant_cars[msg.sender][merchant_cars[msg.sender].length - 1];
                merchant_cars[msg.sender].pop();
                break; 
            }
        }
    }
}