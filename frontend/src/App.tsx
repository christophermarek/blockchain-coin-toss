import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useEthers, useEtherBalance, useContractCall, useContractFunction } from '@usedapp/core';
import { formatEther } from '@ethersproject/units'
import cointossAbi from "./abi/cointoss.json";
import { utils } from 'ethers';
import { Contract } from '@ethersproject/contracts'

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

const wethInterface = new utils.Interface(cointossAbi.abi);
const contract = new Contract(COINTOSS_CONTRACT, wethInterface);

function App() {

  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  const { state, send } = useContractFunction(contract, 'enterContest');


  const enterWager = async(contestIndex: number, wager: any) => {

    await send(contestIndex, wager, { value: wager});
    console.log(state);
  
  }

  const leaveWager = (contestIndex: number) => {

  }

  function GetContests(index: number) {
    let abi = new utils.Interface(cointossAbi.abi);
    const arrayItem: any = useContractCall({
      abi: abi,
      address: COINTOSS_CONTRACT,
      method: "coinTossWagers",
      args: [index],
    }) ?? [];


    if (arrayItem.user1 === undefined && arrayItem.user1wager === undefined && arrayItem.user2 === undefined && arrayItem.user2wager === undefined) {
      return (
        <p>Error loading wager {index}</p>
      )
    } else {
      return (
        <div className='contestbox'>
          <p>User 1 {arrayItem.user1}</p>
          <p>User 1 Wager {arrayItem.user1wager.toString()}</p>
          <p>User 2 {arrayItem.user2}</p>
          <p>User 2 Wager {arrayItem.user2wager.toString()}</p>
          <input type='button' onClick={() => enterWager(index, 5)} value='Join' />
          <input type='button' onClick={() => leaveWager(index)} value='Leave' />
        </div>
      );
    }

  }

  return (
    <div>
      {state.status === 'Exception' &&
        <>
          <p>Error sending contract function</p>
          <ul>
            <li>{state.status}</li>
            <li>{state.errorMessage}</li>
          </ul>
        </>
      }
      {account ?
        (
          <>
            <p>Account: {account}</p>
            {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}

          </>
        )
        :
        (
          <>
            <div>
              <button onClick={() => activateBrowserWallet()}>Connect</button>

            </div>
          </>
        )}

      {GetContests(0)}
      {GetContests(1)}
      {GetContests(2)}
      {GetContests(3)}
    </div>
  )
}

export default App;
