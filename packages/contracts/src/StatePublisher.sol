// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import { IStateSubscriber } from "./IStateSubscriber.sol";

/**
 * Can be used as convenience contract to assist in publishing Gribi state changes
 */
contract StatePublisher {
    IStateSubscriber[] private subscribers;
    mapping(address => uint256[]) private subscriptions;

    function _isSubscriber(IStateSubscriber subscriber) view internal returns (bool) {
        for (uint i = 0; i < subscribers.length; i++) {
            if (address(subscribers[i]) == address(subscriber)) {
                return true;
            }
        }
        return false;
    }

    function subscribe(uint256 code, IStateSubscriber subscriber) public {
        if (!_isSubscriber(subscriber)) {
            subscribers.push(subscriber);
            subscriptions[address(subscriber)].push(code);
        } else {
            uint256[] storage codes = subscriptions[address(subscriber)];
            for (uint i = 0; i < codes.length; i++) {
                if (codes[i] == code) {
                    revert("Already subscribed to this code");
                }
            }
            codes.push(code);
        }
    }

    function removeSubscriber(IStateSubscriber subscriber) public {
        require(_isSubscriber(subscriber), "Subscriber already unsubscribed");
        delete subscriptions[address(subscriber)];
        IStateSubscriber lastElement = subscribers[subscribers.length - 1];
        uint index = 0;
        for (uint i = 0; i < subscribers.length; i++) {
            if (address(subscribers[i]) == address(subscriber)) {
                index = i;
            }
        }
        subscribers[index] = lastElement;
        delete subscribers[subscribers.length - 1];
    }

    function unsubscribe(uint256 code, IStateSubscriber subscriber) public {
        uint256[] storage codes = subscriptions[address(subscriber)];
        uint256 lastElement = codes[codes.length - 1];
        uint index = 0;
        bool found = false;
        for (uint i = 0; i < codes.length; i++) {
            if (codes[i] == code) {
                found = true;
                index = i;
            }
        }
        require(found, "Cannot unsubscribe from a code you aren't subscribed to already");

        if (codes.length == 1) {
            removeSubscriber(subscriber);
            return;
        }

        codes[index] = lastElement;
        delete codes[codes.length - 1];
    }
}