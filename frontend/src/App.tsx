import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useEthers, useEtherBalance, useContractCall } from '@usedapp/core';
import { formatEther } from '@ethersproject/units'
import cointossAbi from "./abi/cointoss.json";
import { utils } from 'ethers';


/*
What I want to do
Connect to wallet
Connect to smart contract
Get all contests in smart contract
user join contest
user leave contest
contest completed
*/

const COINTOSS_CONTRACT = '0x232d8D447ab3421309bE880646580363a632b68b';


function App() {

  const [contests, setContests] = useState<any>(null);

  const { activateBrowserWallet, account } = useEthers()
  const etherBalance = useEtherBalance(account)

  function useGetContests(index: number) {
    let abi = new utils.Interface(cointossAbi.abi);
    const arrayItem: any = useContractCall({
      abi: abi,
      address: COINTOSS_CONTRACT,
      method: "coinTossWagers",
      args: [index],
    }) ?? [];
  
    return arrayItem;
  }

  
  //coin toss staking contract local address, needs to be changed if deployed to mainnet
  async function SetContestsFromBlockChain(){
    let row0 = useGetContests(0);
    let row1 = useGetContests(1);
    let row2 = useGetContests(2);
    let row3 = useGetContests(3);
    let defContests = [row0, row1, row2, row3];
    setContests(defContests);
  }
   

  return (
    <div>
      <div>
        <button onClick={() => activateBrowserWallet()}>Connect</button>
        <button onClick={() => SetContestsFromBlockChain()}>Get Contests</button>
        
      </div>

      {account && <p>Account: {account}</p>}
      {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
    </div>
  )
}

export default App;
