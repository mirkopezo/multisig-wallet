const { expectRevert } = require('@openzeppelin/test-helpers');
const Wallet = artifacts.require('Wallet');

contract('Wallet', (accounts) => {
    let wallet;
    beforeEach(async () => {
        wallet = await Wallet.new([accounts[0], accounts[1], accounts[2]], 2);
        web3.eth.sendTransaction({
            from: accounts[0],
            to: wallet.address,
            value: 1000
        }); 
    });

    it('Should have correct approvers and quorum', async () => {
        const approvers = await wallet.getApprovers();
        const quorum = await wallet.quorum();
        assert(approvers.length === 3);
        assert(approvers[0] === accounts[0]);
        assert(approvers[1] === accounts[1]);
        assert(approvers[2] === accounts[2]); 
        assert(quorum.toNumber() === 2);
    });
    
    it('Should create transfers', async () => {
        await wallet.createTransfer(100, accounts[5], {from: accounts[0]});
        const transfers = await wallet.getTransfers();
        assert(transfers.length === 1);
        assert(transfers[0].id === '0');
        assert(transfers[0].amount === '100');
        assert(transfers[0].to === accounts[5]);
        assert(transfers[0].approvals === '0');
        assert(transfers[0].sent === false);
    });

    it('Should not create transfer if sender is not approved', async () => {
        await expectRevert(wallet.createTransfer(100, accounts[5], {from: accounts[4]}), 'revert');
    });

    it('Should increment approvals', async() => {
        await wallet.createTransfer(100, accounts[5], {from: accounts[0]});
        await wallet.approveTransfer(0, {from: accounts[0]});
        const transfers = await wallet.getTransfers();
        const balance = await web3.eth.getBalance(wallet.address);
        assert(transfers[0].approvals === '1');
        assert(transfers[0].sent === false);
        assert(balance === '1000');
    });

    it('Should send transfer when quorum is reached', async() => {
        const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[6]));
        await wallet.createTransfer(100, accounts[6], {from: accounts[0]});
        await wallet.approveTransfer(0, {from: accounts[0]});
        await wallet.approveTransfer(0, {from: accounts[1]});
        const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(accounts[6]));
        assert(balanceAfter.sub(balanceBefore).toNumber() === 100);
        const transfers = await wallet.getTransfers();
        assert(transfers[0].sent == true);
    });

    it('Should not approve transfer if sender is not approved', async() => {
        await wallet.createTransfer(100, accounts[6], {from: accounts[0]});
        await expectRevert(wallet.approveTransfer(0, {from: accounts[5]}), 'revert');
    }); 

    it('Should not approve transfer if transfer is already sent', async() => {
        await wallet.createTransfer(100, accounts[6], {from: accounts[0]});
        await wallet.approveTransfer(0, {from: accounts[0]});
        await wallet.approveTransfer(0, {from: accounts[1]});
        await expectRevert(wallet.approveTransfer(0, {from: accounts[2]}), 'revert');
    });

    it('Should not approve transfer if sender tries to approve it twice', async() => {
        await wallet.createTransfer(100, accounts[6], {from: accounts[0]});
        await wallet.approveTransfer(0, {from: accounts[0]});
        await expectRevert(wallet.approveTransfer(0, {from: accounts[0]}), 'revert');
    });
});