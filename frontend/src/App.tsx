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

async function GetWagers(index: number) {
  let abi = new utils.Interface(cointossAbi.abi);
  console.log(abi);
  const wagers: any = useContractCall({
    abi: abi,
    address: COINTOSS_CONTRACT,
    method: "coinTossWagers",
    args: [2],
  }) ?? [];

  return wagers;
}

function App() {

  const [wagers, setWagers] = useState<any>(null);

  const { activateBrowserWallet, account } = useEthers()
  const etherBalance = useEtherBalance(account)

  //coin toss staking contract local address, needs to be changed if deployed to mainnet

  
  console.log(GetWagers(0));

  return (
    <div>
      <div>
        <button onClick={() => activateBrowserWallet()}>Connect</button>
      </div>

      {account && <p>Account: {account}</p>}
      {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
    </div>
  )
}

export default App;
