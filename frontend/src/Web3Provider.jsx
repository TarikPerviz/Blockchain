import { useContext, createContext, useEffect, useState } from "react";
import Web3 from "web3";

/* Creating the Web3 context: */
const Web3Context = createContext();

/*
-- MODIFY --
These two variables hold the ABI and contract address of the smart contract on the Ether Blockchain
NOTE: To get the ABI, a contract needs to be veified.
*/
const contractABI = [];
const contractAddress = "";

/* The component that contains all the variable states and the method implementation for the Contract*/
export const Web3Provider = ({children}) => {
    const [web3, setWeb3] = useState(null); // Web3  variable used to 
    const [account, setAccount] = useState(null); // Account variable will hold the FIRST ACCOUNT from the users MetaMask wallet
    const [contract, setContract] = useState(null); // Contract will be used to access the specific contract methods later on

    /*
        Initially, this effect is ran upon creation of the context component. The function
        checks if there is a web3 instance present in the browser. If there isn't, an error
        message will be displayed and no account will be associated with the actual account variable.

        Otherwise, the function will attempt to associate an account from the users MetaMask extension.
        By default, it will grab the first account the user has in their MetaMask extension. Afterwards,
        it will use the ABI and Contract Address to associate the contract variable with the actual 
        contract deployed on the testnet / mainnet.

        If everything goes to plan, the variables will all be set and there shouldn't be any errors during
        execution. This will only be executed ONCE per page reload.
    */
    useEffect(() => {
        /*
            NOTE: Since we are executing componet loads constantly in React, this entire thing has to be
            an async function, since we want to prevent the effect from finishing and loading the components
            until an actual instance of an account is attempted to be created.
        */
        const initialiseWeb3 = async () => {
            if(window.ethereum){
                try{
                    const web3Instance = new Web3(window.ethereum);
                    setWeb3(web3Instance); // Set the WEB3 insance to be the current web3 connection in the window

                    await window.ethereum.request({method: "eth_requestAccounts"})
                    const accounts = await web3Instance.eth.getAccounts();
                    setAccount(accounts[0]); // Get the account from the users MetaMask wallet

                    const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
                    setContract(contractInstance); // Set the contract to be whatever ABI is specified at the given address
                } catch (error){
                    console.error('Error while connecting to MetaMask!', error)
                }
            } else {
                console.error("MetaMask is not installed! Please install it!")
            }
        }

        initialiseWeb3()
    }, []) // This indicates that the effect is not dependant on any variables, hence it will only trigger a recomposition on the page reload

    /*
        -- FUNCTIONs - MODIFY --

        Below you should provide any functions you want to be executable from the context here.
        This basically means provide frontend implementations of the smart contract functions.
        Once the function is written, provide it in the "value" prop below in the return component.
    */

    const helloContextProvider = () => {
        console.log("Hello from the context provider!")
    }

    /*
        -- CONTEXT PROVIDING - MODIFY --
        This will return the context, along with all of the states and functions.
        In the "value" prop, provide all the functions you place, or any state you might require.
        ANY FUNCTION THAT IS NOT PROVIDED HERE BUT CALLED LATER WILL RESULT IN AN ERROR.
    */
    return (
        <Web3Context.Provider value={{ web3, account, contract, helloContextProvider }}>
            {children}
        </Web3Context.Provider>
    );
}

/*
    In order to access the context easier, this hook is created. Without explaining too much, hooks
    let you use features of react components. Here, we will use to hook to later extract the 
    functions and state variables without having to provide them to the props of all components.
*/
export const useWeb3 = () => {
    return useContext(Web3Context);
};