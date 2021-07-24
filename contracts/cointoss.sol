// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract cointoss {
    struct coinTossWager {
        uint256 wagerIndex;
        address user1;
        uint256 user1wager;
        address user2;
        uint256 user2wager;
    }

    coinTossWager[4] public coinTossWagers;

    constructor() public {
        coinTossWager memory defaultCoinTossWager = coinTossWager(
            0,
            address(0),
            0,
            address(0),
            0
        );
        for (uint256 i = 0; i < 4; i++) {
            defaultCoinTossWager.wagerIndex = i;
            coinTossWagers[i] = defaultCoinTossWager;
        }
    }


    /*
    When user clicks on the start game button.
  */
    //should this return false when fail?
    function enterContest(uint256 wagerIndex, uint256 wager) public {

        require(wagerIndex >= 0 && wagerIndex < 4, "Invalid wager index, must be between 0-3");
        require(wager > 0, "Wager must be a positive number");

        //check if wagerIndex has room
        uint256 count = 0;
        uint256 failed = 1;
        for (count; count < 4; count++) {
            if (coinTossWagers[count].wagerIndex == wagerIndex) {
                failed = 0;
                break;
            }
        }

        //if not return wager and the end condition.
        if (failed == 1) {
            //wagerIndex not found
            //end somehow and return money
        } else {
            //enter user into wager
            failed = 1;
            address newPlayer = msg.sender;
            //check if can be user1,
            //check if user is already registered into wager
            if (coinTossWagers[count].user1 == address(0)) {
                failed = 0;
                coinTossWagers[count].user1 = newPlayer;
                coinTossWagers[count].user1wager = wager;
            } else if (coinTossWagers[count].user2 == address(0)) {
                //check if can be user2.
                failed = 0;
                coinTossWagers[count].user2 = newPlayer;
                coinTossWagers[count].user2wager = wager;
            }else{
                //error
                revert("Error entering into wager index, might be full");
            }

          

        }
    }

    /*
    only if other player did not ready up yet. 
  */
    function leaveContest(uint256 wagerIndex) public {}

    //way to end wager after 60 seconds inactivity.
}
