import React, { useEffect, useState } from 'react';
import { getWeb3, getWallet } from './utils';
// we will import header and render it
import Header from './Header.js';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  // we will first define some state variable, we are going to define a state inside our react component for those 2 variables
  // (I think [] means empty array, because approvers is array of addresses)
  const [approvers, setApprovers] = useState([]);
  // and we will do same thing for quorum
  const [quorum, setQuorum] = useState(undefined);
  useEffect(() => {
    const init = async () => {
      const web3 = getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);
      // we will read those 2 values just after we get our web3 contract instance. first we start with our contract instance then
      // we access 'methods' key and then we can find all public or external functions of our smart contract and we will first
      // access 'getApprovers()' function, and after you call 'call' function and we store result inside 'approvers' variable
      const approvers = await wallet.methods.getApprovers().call();
      // and we will do same thing for quorum
      const quorum = await wallet.methods.quorum().call();
      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
      // and now we can save this into react states
      setApprovers(approvers);
      setQuorum(quorum);
      // we will now pass this values to new component called 'Header.js'
      
    }
    init();
  }, []);

  if(
    typeof web3 === 'undefined'
    || typeof accounts === 'undefined'
    || typeof wallet === 'undefined'
    // we will add condition for approvers and quorum
    || approvers.length === 0
    || typeof quorum === 'undefined'
  ) {
    return <div>Loading...</div>
  }

  return (
    <div>
      MultiSig Dapp
      <Header approvers={approvers} quorum={quorum} />
    </div>
  );
}

export default App;
