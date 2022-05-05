// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

error TransferSent();
error TransferApproved();
error NotAllowed();

contract Wallet {
    address[] private approvers;
    mapping(address => mapping(uint256 => bool)) private approvals;

    Transfer[] private transfers;

    uint256 public immutable quorum;

    struct Transfer {
        uint256 id;
        uint256 amount;
        uint64 approvals;
        address to;
        bool sent;
    }

    modifier onlyApprover() {
        bool allowed = false;
        uint256 approversLength = approvers.length;

        for (uint256 i = 0; i < approversLength; ++i) {
            if (approvers[i] == msg.sender) {
                allowed = true;
            }
        }
        if (!allowed) revert NotAllowed();
        _;
    }

    constructor(address[] memory _approvers, uint256 _quorum) {
        approvers = _approvers;
        quorum = _quorum;
    }

    receive() external payable {}

    function createTransfer(uint256 amount, address to) external onlyApprover {
        transfers.push(Transfer(transfers.length, amount, 0, to, false));
    }

    function approveTransfer(uint256 id) external onlyApprover {
        if (transfers[id].sent) revert TransferSent();
        if (approvals[msg.sender][id]) revert TransferApproved();
        approvals[msg.sender][id] = true;
        transfers[id].approvals++;

        if (transfers[id].approvals >= quorum) {
            transfers[id].sent = true;
            payable(transfers[id].to).transfer(transfers[id].amount);
        }
    }

    function getApprovers() external view returns (address[] memory) {
        return approvers;
    }

    function getTransfers() external view returns (Transfer[] memory) {
        return transfers;
    }
}
