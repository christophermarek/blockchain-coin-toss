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
            //check if user isnt already registered into wager
            //check if wagers are negative
            if (coinTossWagers[count].user1 == address(0)) {
                failed = 0;
                coinTossWagers[count].user1 = newPlayer;
                coinTossWagers[count].user1wager = wager;
            } else if (coinTossWagers[count].user2 == address(0)) {
                //check if can be user2.
                failed = 0;
                coinTossWagers[count].user2 = newPlayer;
                coinTossWagers[count].user2wager = wager;
            }

            if (failed == 0) {
                //end contract and return money
                //user cannot enter wager
            } else {
                //if both players have entered and are now ready, execute toss fn and return fn.
                //is this how you do that?
            }

        }
    }

    /*
    only if other player did not ready up yet. 
  */
    function leaveContest(uint256 wagerIndex) public {}

    //way to end wager after 60 seconds inactivity.
}
