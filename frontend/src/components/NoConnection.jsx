export default function NoConnection(){
    return(
        <section className="flex justify-center items-center h-full">
            <img src="/assets/logo.png" alt="metamasklogo" className="absolute opacity-10 h-full" />
            <div className="p-10 flex flex-col justify-center items-center text-white rounded-xl z-10">
                <img src="/assets/logo.png" alt="" className="w-1/6 h-1/6 animate-pulse" />
                <h1 className="text-4xl mb-2 open-sans-bold">No MetaMask Account Detected!</h1>
                <p className="text-xl">This application requires MetaMask to create a connection.</p>
                <p className="text-xl">Please make an account and download it from the link below.</p>
                <a target="_blank" className="text-xl mt-2" href="https://metamask.io/">https://metamask.io/</a>
            </div>
        </section>
    )
}