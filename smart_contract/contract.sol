/* SPDX-License-Identifier: MIT */
pragma solidity >=0.7.0 <0.9.0;

contract Counter {

    struct Token {
    bytes32 r;
    bytes32 s;
    uint8 v;
    }

    address private signer_key;
    uint256 public counter;

    constructor(address key) {
        signer_key = key;
    }

    function increment(bytes32 r, bytes32 s, uint8 v) public  {
        require(verify(r,s,v), "invalid signature");
        counter = counter+1;
    }

    function decrement(bytes32 r, bytes32 s, uint8 v) public  {
        require(counter>0, "Counter can not reach a negative value");
        require(verify(r,s,v), "invalid signature");
        counter = counter-1;
    }

    function verify(bytes32 r, bytes32 s, uint8 v) public view returns(bool) {
        bytes32 hash = keccak256(abi.encode(msg.sender));
        address signer = ecrecover(hash,v,r,s);
        require(signer != address(0), "Invalid Signature");
        return signer == signer_key;
    }

}