import { useWeb3 } from "../Web3Provider"

/*
    MAIN COMPONENT - MODIFY

    This is where the app starts and you should ONLY SEE THIS if you have succesfully created and connected
    to MetaMask. Everything in this template from now on is yours to change, including the theme and style.
*/
export default function Main(){
    const { account, helloContextProvider } = useWeb3();
    helloContextProvider() /* Example function execution from context*/
    return(
        <div className="flex flex-col justify-center items-center h-full">
            <img src="/assets/logo.png" alt="metamasklogo" className="absolute opacity-10 h-full" />
            <img src="/assets/logo.png" alt="" className="w-1/6 animate-tick-tick" />
            <h1 className="text-2xl text-white font-bold">Yippie! Connected to {account}</h1>
            <h2 className="text-xl text-white">Now adjust the Web3Provider.jsx and frontend as needed!</h2>
        </div>
    )
}