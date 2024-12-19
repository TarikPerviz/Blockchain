import Main from "./components/Main";
import NoConnection from "./components/NoConnection";
import { useWeb3 } from "./Web3Provider";

export default function App() {
    const { account } = useWeb3(); // Use the context to provide necessary items from the Web3Provider

    if (!account) {
        return (
            <NoConnection />
        );
    }

    return (
        <Main />
    );
}