pragma solidity 0.6.0;

contract Wallet {
    address[] public approvers;
    uint public quorum;
    uint public nextId;

    struct Transfer {
        uint id;
        uint amount; 
        address payable to; 
        uint approvals; 
        bool sent; 
    }

    mapping(uint => Transfer) public transfers;
    
    constructor(address[] memory _approvers, uint _quorum) public {
        approvers = _approvers;
        quorum = _quorum;
    }

    function getApprovers() external view returns(address[] memory) {
        return approvers; 
    }

    function createTransfer(uint amount, address payable to) external {
        transfers[nextId] = Transfer(
            nextId, 
            amount, 
            to, 
            0, 
            false 
        );
        nextId++;
    }
}