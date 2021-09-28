import React, { useEffect, useState } from 'react';
import { getWeb3, getWallet } from './utils';
import { AppBar, CssBaseline, Toolbar, Typography } from '@material-ui/core';
import Header from 'components/Header/Header';
import NewTransfer from 'components/NewTransfer/NewTransfer';
import TransferList from 'components/TransferList/TransferList';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState([]);
  const [quorum, setQuorum] = useState(undefined);
  const [transfers, setTransfers] = useState([]);
  
  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);
      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      const transfers = await wallet.methods.getTransfers().call();
      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
      setApprovers(approvers);
      setQuorum(quorum);
      setTransfers(transfers);
    }
    init();
  }, []);

  const createTransfer = transfer => {
    wallet.methods
    .createTransfer(transfer.amount, transfer.to)
    .send({from: accounts[0]});
  }

  const approveTransfer = transferId => {
    wallet.methods
    .approveTransfer(transferId)
    .send({from: accounts[0]});
  }

  if(
    typeof web3 === 'undefined'
    || typeof accounts === 'undefined'
    || typeof wallet === 'undefined'
    || approvers.length === 0
    || typeof quorum === 'undefined'
  ) {
    return <div>Loading...</div>
  }

  return (
    <>
        <CssBaseline />
        <AppBar position="relative">
        <Toolbar>
            <Typography variant="h6">
                Multi-Signature Wallet
            </Typography>
        </Toolbar>
        </AppBar>
        <div>
        <Header approvers={approvers} quorum={quorum} />
        <NewTransfer createTransfer={createTransfer} />
        <TransferList transfers={transfers} approveTransfer={approveTransfer} />
        </div>
    </>
  );
}

export default App;
