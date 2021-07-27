import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useEthers, useEtherBalance } from '@usedapp/core';
import { formatEther } from '@ethersproject/units'


/*
What I want to do
Connect to wallet
Connect to smart contract
Get all contests in smart contract
user join contest
user leave contest
contest completed
*/

function App() {
  const { activateBrowserWallet, account } = useEthers()
  const etherBalance = useEtherBalance(account)

  //coin toss staking contract local address, needs to be changed if deployed to mainnet
  const STAKING_CONTRACT = '0x00000000219ab540356cBB839Cbe05303d7705Fa'

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
