/* The following is the process of setting up: the account, the contract and the connection */
// const Web3 = require('web3');
const connected_div = document.querySelector("#isConnected"); // Container for the application
const disconnected_div = document.querySelector("#isNotConnected"); // Container for the 404 like message
const login_message = document.querySelector("#loginMessage"); // Message for connecting
const connection_section = document.querySelector(".connection"); // Container for the button itself, and the account address later
const main = document.querySelector("#main"); // Container for the main section
const books_section = document.querySelector("#books_section");
const book_returned = document.querySelector("#book_returned");
const log_in_header = document.querySelector("#loginHeader");

// Required variables and constants to connect:
const contract_address = "0x9eD6Aae2EcCB14Bc633E95DdF719ae01077C645e";
const abi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"enum CarDealership.CarBrand","name":"brand","type":"uint8"}],"name":"CarAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"username","type":"string"},{"indexed":false,"internalType":"address","name":"add","type":"address"}],"name":"CustomerAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"username","type":"string"},{"indexed":false,"internalType":"address","name":"add","type":"address"}],"name":"MerchantAdded","type":"event"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"enum CarDealership.CarBrand","name":"_brand","type":"uint8"},{"internalType":"string","name":"_model","type":"string"},{"internalType":"uint256","name":"_prod_year","type":"uint256"},{"internalType":"uint256","name":"_kilometers","type":"uint256"},{"internalType":"enum CarDealership.Engine","name":"_engine","type":"uint8"},{"internalType":"uint256","name":"_price","type":"uint256"},{"internalType":"uint256","name":"_displacement","type":"uint256"},{"internalType":"string","name":"_image_url","type":"string"}],"name":"addCarForSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_first_name","type":"string"},{"internalType":"string","name":"_last_name","type":"string"},{"internalType":"string","name":"_username","type":"string"},{"internalType":"enum CarDealership.CarBrand","name":"_brand","type":"uint8"}],"name":"addCustomer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_first_name","type":"string"},{"internalType":"string","name":"_last_name","type":"string"},{"internalType":"string","name":"_username","type":"string"},{"internalType":"enum CarDealership.CarBrand","name":"_brand","type":"uint8"}],"name":"addMerchant","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allCars","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"merchant_address","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"enum CarDealership.CarBrand","name":"brand","type":"uint8"},{"internalType":"string","name":"model","type":"string"},{"internalType":"uint256","name":"production_year","type":"uint256"},{"internalType":"uint256","name":"kilometers","type":"uint256"},{"internalType":"bool","name":"for_sale","type":"bool"},{"internalType":"enum CarDealership.Engine","name":"engine","type":"uint8"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"engine_displacement","type":"uint256"},{"internalType":"string","name":"image_url","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_carId","type":"uint256"}],"name":"buyCar","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"checkRegister","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"customers","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"first_name","type":"string"},{"internalType":"string","name":"last_name","type":"string"},{"internalType":"string","name":"username","type":"string"},{"internalType":"enum CarDealership.CarBrand","name":"favourite_car_brand","type":"uint8"},{"internalType":"address","name":"customer_address","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_carId","type":"uint256"}],"name":"deleteCar","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getMerchantCars","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUserCars","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isMerchant","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isRegistered","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"loadAvailableCars","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"merchant_address","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"enum CarDealership.CarBrand","name":"brand","type":"uint8"},{"internalType":"string","name":"model","type":"string"},{"internalType":"uint256","name":"production_year","type":"uint256"},{"internalType":"uint256","name":"kilometers","type":"uint256"},{"internalType":"bool","name":"for_sale","type":"bool"},{"internalType":"enum CarDealership.Engine","name":"engine","type":"uint8"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"engine_displacement","type":"uint256"},{"internalType":"string","name":"image_url","type":"string"}],"internalType":"struct CarDealership.Car[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_carId","type":"uint256"}],"name":"loadCarById","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"merchant_address","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"enum CarDealership.CarBrand","name":"brand","type":"uint8"},{"internalType":"string","name":"model","type":"string"},{"internalType":"uint256","name":"production_year","type":"uint256"},{"internalType":"uint256","name":"kilometers","type":"uint256"},{"internalType":"bool","name":"for_sale","type":"bool"},{"internalType":"enum CarDealership.Engine","name":"engine","type":"uint8"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"engine_displacement","type":"uint256"},{"internalType":"string","name":"image_url","type":"string"}],"internalType":"struct CarDealership.Car","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"merchant_cars","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"merchants","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"first_name","type":"string"},{"internalType":"string","name":"last_name","type":"string"},{"internalType":"string","name":"username","type":"string"},{"internalType":"enum CarDealership.CarBrand","name":"favourite_car_brand","type":"uint8"},{"internalType":"uint256","name":"cars_for_Sale","type":"uint256"},{"internalType":"address","name":"merchant_address","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_carId","type":"uint256"}],"name":"removeCarFromInventory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"user_cars","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
let account = null; // This will hold the account for the MetaMask account
let web3;
let contract;

window.addEventListener("DOMContentLoaded", async () => {
    if (typeof window.ethereum !== 'undefined') {
        // MetaMask is available
        console.log("MetaMask is available!");
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            account = accounts[0];
            console.log("Connected account:", account);

            // Initialize Web3 instance with the Ethereum provider
            web3 = new Web3(window.ethereum);

            if (account) {
                console.log(account, "has been connected!");
                login_message.classList.add("d-none");
                log_in_header.classList.add("d-none");
                main.classList.remove("d-none");
                await checkRegister(); // Ensure this function handles async properly
            }
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
        }
    } else {
        console.error("MetaMask is not available!");
        // Handle MetaMask not being installed
        disconnected_div.classList.remove("d-none");
        connected_div.classList.add("d-none");
    }
});

async function initializeContract() {
    console.log("In the contract initializer");
    if (!web3) {
        web3 = new Web3(window.ethereum);
        return;
    }
    contract = await new web3.eth.Contract(abi, contract_address);
    console.log("Contract initialized:", contract);
}

async function getMerchantData() {
    contract = await new web3.eth.Contract(abi, contract_address);
    try {
        const merchantData = await contract.methods.merchants(account).call();
        console.log("Merchant Data:", merchantData);
        return merchantData;
    } catch (error) {
        console.error("Error fetching merchant data:", error);
    }
}

async function getSpecificMerchantData(address) {
    contract = await new web3.eth.Contract(abi, contract_address);
    try {
        const merchantData = await contract.methods.merchants(address).call();
        console.log("Specific Merchant Data:", merchantData);
        return merchantData;
    } catch (error) {
        console.error("Error fetching merchant data:", error);
    }
}


async function getCustomerData() {
    contract = await new web3.eth.Contract(abi, contract_address);
    try {
        const customerData = await contract.methods.customers(account).call();
        console.log("Customer Data:", customerData);
        return customerData;
    } catch (error) {
        console.error("Error fetching customer data:", error);
    }
}

async function getSpecificCustomerData(address) {
    contract = await new web3.eth.Contract(abi, contract_address);
    try {
        const customerData = await contract.methods.customers(address).call();
        console.log("Specific Customer Data:", customerData);
        return customerData;
    } catch (error) {
        console.error("Error fetching customer data:", error);
    }
}

async function getUserCars() {
    contract = await new web3.eth.Contract(abi, contract_address);
    try {
        const userCarsData = await contract.methods.getUserCars(account).call({from: account});
        console.log("User Cars:", userCarsData);
        return userCarsData;
    } catch (error) {
        console.error("Error fetching customer CARS:", error);
    }
}

async function getMerchantCars() {
    contract = await new web3.eth.Contract(abi, contract_address);
    try {
        console.log("Waiting for cars")
        const data = await contract.methods.getMerchantCars(account).call({from: account});
        console.log("User Cars:", data);
        return data;
    } catch (error) {
        console.error("Error fetching merchant CARS:", error);
    }
}


/* The following is the actual functions regarding the cotnract itself and the frontend */
async function checkRegister(){
    const contract = new web3.eth.Contract(abi, contract_address);
    let registerStatus = await contract.methods.checkRegister().call({ from: account });
    if(!registerStatus){
        window.location.href = "/register";
    }
}

async function addCustomer(first_name, last_name, username, favourite_car_brand){
    const contract = new web3.eth.Contract(abi, contract_address);
    await contract.methods.addCustomer(first_name, last_name, username, favourite_car_brand).send({from: account});

}

async function addMerchant(first_name, last_name, username, favourite_car_brand){
    const contract = new web3.eth.Contract(abi, contract_address);
    await contract.methods.addMerchant(first_name, last_name, username, favourite_car_brand).send({from: account});

}

async function isMerchant(){
    contract = await new web3.eth.Contract(abi, contract_address);
    try{
        console.log("In isMerchant function")
        const isMerchant = await contract.methods.isMerchant().call({ from: account });
        console.log("The current user is a merchant?", isMerchant)
        return isMerchant;
    } catch (error) {
        console.log("Error while feetching merchant status!")
    }
}

async function loadAvailableCars(){
    contract = await new web3.eth.Contract(abi, contract_address);
    try{
        console.log("Loading cars...")
        const cars = await contract.methods.loadAvailableCars().call({from: account});
        return cars;
    } catch (error){
        console.error("Error while fetching all cars!", error);
    }
}

async function loadCarById(id){
    contract = await new web3.eth.Contract(abi, contract_address);
    try{
        console.log("Loading car...")
        const car = await contract.methods.loadCarById(id).call({from: account});
        return car;
    } catch (error){
        console.error("Error while fetching a car with id: ", id , error);
    }
}

async function addCarForSale(
    name,
    brand,
    model,
    production_year,
    kilometers,
    engine,
    price,
    displacement,
    thumbnail
){
    contract = await new web3.eth.Contract(abi, contract_address);
    try{
        console.log("Trying to add car...");
        await contract.methods.addCarForSale(name, brand, model, production_year, kilometers, engine, price, displacement, thumbnail).send({from: account})
    } catch (err){
        console.log("Error while adding car: ", err)
    }
}

async function buyCar(id, carPrice){
    contract = await new web3.eth.Contract(abi, contract_address);
    try{
        console.log("Trying to buy...");
        await contract.methods.buyCar(id).send({from: account, value: carPrice})
    } catch (err){
        console.log("Error while adding car: ", err)
    }
}

async function deleteCar(id){
    contract = await new web3.eth.Contract(abi, contract_address);
    try{
        console.log("Trying to delete...");
        await contract.methods.deleteCar(id).send({from: account})
    } catch (err){
        console.log("Error while deleting car: ", err)
    }
}

async function removeFromInventory(id) {
    contract = await new web3.eth.Contract(abi, contract_address);
    try{
        console.log("Trying to remove from inventory...");
        await contract.methods.removeCarFromInventory(id).send({from: account})
    } catch (err){
        console.log("Error while removing car from inv: ", err)
    }
}



// const getMyBooks = async () => {
//     const contract = new web3.eth.Contract(abi, contract_address);
//     let books = await contract.methods.getMyBooks().call({ from: account });

//     let book_strings = "";
//     books.forEach(book => {
//         book_strings +=
//             `
//                 <div class="card text-center" style="width: 18rem;">
//                     <div class="card-body">
//                         <h5 class="card-title">${book.name}</h5>
//                         <p class="card-text">Book ID: ${book.id}</p>
//                         <button class="btn btn-primary" onClick=(returnBook(${book.id}))> Return Book </button>
//                     </div>
//                 </div>
//                 `
//     });

//     books_section.innerHTML = book_strings;
// }
