import React, { useState, useEffect } from 'react';
import getWeb3 from "./getWeb3";
import cointossContract from "./cointoss.json";
import './App.css';

interface contest{
  wagerIndex: number,
  user1: string,
  user1wager: number,
  user2: string,
  user2wager: number,
}

function App() {
  const [storageValue, setStorageValue] = useState<any>(0);
  const [web3, setweb3] = useState<any>(null);
  const [accounts, setaccounts] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [contests, setContests] = useState<Array<contest>>([]);

  useEffect(() => {

    const connectWeb3 = async() => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
  
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
  
        // Get the contract instance.
        const networkId: any = await web3.eth.net.getId();
        const deployedNetwork = cointossContract.networks[networkId] as keyof typeof cointossContract.networks;
        const instance = new web3.eth.Contract(
          cointossContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
  
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setweb3(web3);
        setaccounts(accounts);
        setContract(instance);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }

    connectWeb3();
   
  });


  return (
    <div className="App">
      
      <p>Secure Coin Toss</p>
      <p>Powered by ETH network. </p>

      {contests.length === 0 &&
        ('Data from blockchain not fetched yet')
      }

    </div>
  );
}

export default App;
