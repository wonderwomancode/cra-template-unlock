import logo from "./logo.svg";
import "./App.css";
import { LockedContent } from "./components";
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";
import { INFURA_ID, NETWORKS } from "./constants";

const client = createClient(
  getDefaultClient({
    appName: "Example Unlock enabled dApp",
    INFURA_ID,
  }),
);

function App() {
  //
  const targetNetwork = NETWORKS.xdai;
  const publicLock = {
    id: "0xac1fceC2e4064CCd83ac8C9B0c9B8d944AB0D246",
        "name": "Unlock Members"
  };
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <ConnectKitButton />
        <div className="App">
          <LockedContent
            publicLock={publicLock}
            targetNetwork={targetNetwork}
          />
        </div>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;
