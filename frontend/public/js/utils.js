const Utils = {
    loadThumbnailCars : async (container) => {
        const cars = await loadAvailableCars();
        console.log(cars);

        if(cars.length == 0){
            container.innerHTML +=
        `
         <h1>Browse cars</h1>
        <p class="fs-4">No cars available! Add cars for sale?</p>
        <a class="btn btn-default01" href="#">Add cars</a>
        ` 
        } else {
            limit = 0;
            toAdd = "";
            for(i = 0; i < cars.length - 1; i++){
                const merchant = await getSpecificMerchantData(cars[i].merchant_address);
                if(Number(cars[i].id) == 0){
                    continue;
                }
                toAdd += 
                `
                <div class="card mx-2 my-2" style="width: 18rem;">
                    <img src="${cars[i].image_url}" class="card-img-top" style="height: 10rem;" alt="...">
                    <div class="card-body d-flex flex-column">
                        <h4 class="card-title align-self-start">${cars[i].name}</h4>
                        <p class="mb-0">Posted by: ${merchant.username}</p>
                        <p class="mb-0">Model: ${cars[i].model}</p>
                        <h4 class="align-self-end">${cars[i].price} WEI</h4>
                        
                    </div>
                </div>
                `

                limit++;
                if(limit > 4){
                    break;
                }
            }

            container.innerHTML = toAdd;
        }
        
        container.classList.add('show')
    },

    loadBoughtCars : async (container) => {
        console.log("Awaiting")
        const cars = await getUserCars();
    
        if(cars.length == 0){
            container.innerHTML +=
        `
        <p class="fs-4">No cars available! Start buying cars and they will appear here!</p>
        <a class="btn btn-default01 w-100" href="/sell">Sell cars</a>
        ` 
        } else {
            toAdd = "";
            for(i = 0; i < cars.length; i++){
                const car = await loadCarById(Number(cars[i]))
                    toAdd += 
                    `
                    <div class="card mx-2 my-2" style="width: 18rem;">
                        <img src="${car.image_url}" class="card-img-top" style="height: 10rem;" alt="...">
                        <div class="card-body d-flex flex-column">
                            <h4 class="card-title align-self-start">${car.name}</h4>
                            <p class="mb-0">Model: ${car.model}</p>
                            <p class="mb-0">Brand: ${Utils.getCarBrandName(Number(car.brand))}</p>
                            <p class="mb-0">Kilometers: ${car.kilometers}</p>
                            <a class="btn btn-danger" onClick=Utils.removeFromInv(${car.id})>Return Car</a>
                        </div>
                    </div>
                    `
            }

            container.innerHTML = toAdd;
        }
        
        container.classList.add('show')
    },

    loadUploadedCars : async (container) => {
        console.log("Awaiting")
        const cars = await getMerchantCars();
    

        if(cars.length == 0){
            container.innerHTML +=
        `
        <p class="fs-4">No cars available! Start selling your cars and they will appear here!</p>
        <a class="btn btn-default01 w-100" href="/sell">Sell cars</a>
        ` 
        } else {
            toAdd = "";
            for(i = 0; i < cars.length; i++){
                const car = await loadCarById(Number(cars[i]))
                if(car.for_sale){
                    toAdd += 
                    `
                    <div class="card mx-2 my-2" style="width: 18rem;">
                        <img src="${car.image_url}" class="card-img-top" style="height: 10rem;" alt="...">
                        <div class="card-body d-flex flex-column">
                            <h4 class="card-title align-self-start">${car.name}</h4>
                            <p class="mb-0">Model: ${car.model}</p>
                            <p class="mb-0">Brand: ${Utils.getCarBrandName(Number(car.brand))}</p>
                            <p class="mb-0">Kilometers: ${car.kilometers}</p>
                            <h4 class="align-self-end">FOR SALE</h4>
                            <a class="btn btn-danger" onClick=Utils.deleteCarFunc(${car.id})>Delete Car</a>
                        </div>
                    </div>
                    `
                } else {
                    toAdd += 
                    `
                    <div class="card mx-2 my-2" style="width: 18rem;">
                        <img src="${car.image_url}" class="card-img-top" style="height: 10rem;" alt="...">
                        <div class="card-body d-flex flex-column">
                            <h4 class="card-title align-self-start">${car.name}</h4>
                            <p class="mb-0">Model: ${car.model}</p>
                            <h4 class="align-self-end">BOUGHT</h4>
                            
                        </div>
                    </div>
                    `
                }
               
            }

            container.innerHTML = toAdd;
        }
        
        container.classList.add('show')
    },

    loadCars : async (container) => {
        const cars = await loadAvailableCars();
        console.log(cars);

        if(cars.length == 0){
            container.innerHTML +=
        `
        <p class="fs-4 text-center">No cars available right now! :( <br>Wait for merchants to upload cars</p>
        ` 
        } else {
            toAdd = "";
            for(i = 0; i < cars.length - 1; i++){
                const merchant = await getSpecificMerchantData(cars[i].merchant_address);
                if(Number(cars[i].id) == 0){
                    continue;
                }
                toAdd += 
                `
                <div class="card mx-2 my-2" style="width: 18rem;">
                    <img src="${cars[i].image_url}" class="card-img-top" style="height: 10rem;" alt="...">
                    <div class="card-body d-flex flex-column">
                        <h4 class="card-title align-self-start">${cars[i].name}</h4>
                        <p class="mb-0">Posted by: ${merchant.username}</p>
                        <p class="mb-0">Model: ${cars[i].model}</p>
                        <h4 class="align-self-end">${cars[i].price} WEI</h4>
                        <a class="btn btn-default01" onClick=Utils.viewCarDetails(${cars[i].id})>View car</a>
                    </div>
                </div>
                `
            }

            container.innerHTML = toAdd;
        }
        
        container.classList.add('show')
    },


    viewCarDetails : async (id) => {
        const carDetails = await loadCarById(id);

        const merchant = await getSpecificMerchantData(carDetails.merchant_address);

        document.querySelector("#carImage").src = carDetails.image_url;
        const description = document.querySelector("#details");
        description.innerHTML  =
        `
            <h4 id="carTitle" class="card-title fs-1">${carDetails.name}</h4>
            <h5 class="card-subtitle mb-2 text-body-secondary">Posted by: ${merchant.username}</h6>
            <p class="fs-4 mb-0"><strong>Model:</strong> ${carDetails.model}</p>
            <p class="fs-4 mb-0"><strong>Brand:</strong> ${Utils.getCarBrandName(Number(carDetails.brand))}</p>
            <p class="fs-4 mb-0"><strong>Kilometers:</strong>  ${carDetails.kilometers}</p>
            <p class="fs-4 mb-0"><strong>Engine:</strong>  ${Utils.getFuelType(Number(carDetails.engine))}</p>
            <p class="fs-4 mb-0"><strong>Year:</strong>  ${carDetails.production_year}</p>
            <p class="fs-4 mb-0 text-end"><strong>Price:</strong>  ${carDetails.price}</p>
            ${
                !isMerch
                    ? `<button class="btn btn-default01 w-100 h-25" onClick=Utils.buyCarFunc(${carDetails.id},${carDetails.price})>Buy car</button>`
                    : ""
            }
        `

        const modal = new bootstrap.Modal(document.querySelector("#carDetailsModal"));
        modal.show();
    },

    buyCarFunc : async (id, carPrice) => {
        await buyCar(id, carPrice)
    },

    getCarBrandName : (value) => {
        const brands = {
            0: "BMW",
            1: "Mercedes",
            2: "Audi",
            3: "Volkswagen",
            4: "Skoda",
            5: "Ferrari",
            6: "Lamborghini",
            7: "Seat",
            8: "Renault",
            9: "Ford",
            10: "Fiat",
            11: "Suzuki",
            12: "Other"
        };
        
    
        return brands[value] || "Unknown Brand";
    },

    getFuelType : (value) => {
        const fuelTypes = {
            0: "Diesel",
            1: "Petrol",
            2: "Gas",
            3: "Electric"
        };
    
        return fuelTypes[value] || "Unknown Fuel Type";
    },

    deleteCarFunc : async (id) => {
        await deleteCar(id);
        alert("Car has been deleted")
    },

    removeFromInv : async (id) => {
        await removeFromInventory(id);
        alert("Car has been removed from inventory")
    }
    // OSTALO JOS DA TESTIRAM BUY CAR I REMOVE CAR FROM INVENTORY I MOZDA STYLING UPDATE
}