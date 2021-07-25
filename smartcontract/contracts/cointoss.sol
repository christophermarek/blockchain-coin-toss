// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract cointoss {
    struct coinTossWager {
        uint256 wagerIndex;
        address user1;
        uint256 user1wager;
        address user2;
        uint256 user2wager;
        address winner;
    }

    coinTossWager[4] public coinTossWagers;

    event LogWithdrawal(address receiver, uint256 amount);

    constructor() public {
        coinTossWager memory defaultCoinTossWager = coinTossWager(
            0,
            address(0),
            0,
            address(0),
            0,
            address(0)
        );
        for (uint256 i = 0; i < 4; i++) {
            defaultCoinTossWager.wagerIndex = i;
            coinTossWagers[i] = defaultCoinTossWager;
        }
    }

    /**
    called after user enters a contest to check if its full, if it is then
    execute the coin toss and payout.
     */
    function executeWager(uint256 wagerIndex) private {
        address user1 = coinTossWagers[wagerIndex].user1;
        address user2 = coinTossWagers[wagerIndex].user2;

        if (user1 != address(0) && user2 != address(0)) {
            //valid wager
            //get number for coin flip between 0 and 1
            //i know this isnt true randomness
            uint256 winner = uint8(
                uint256(
                    keccak256(
                        abi.encodePacked(block.timestamp, block.difficulty)
                    )
                ) % 2
            );

            uint256 reward = coinTossWagers[wagerIndex].user1wager +
                coinTossWagers[wagerIndex].user2wager;
            address winnerAddress;

            if (winner == 0) {
                winnerAddress = user1;
            } else {
                winnerAddress = user2;
            }

            //pay out winner
            address(winner).transfer(reward);

            //delete contest entry
            coinTossWagers[wagerIndex].user1 = address(0);
            coinTossWagers[wagerIndex].user2 = address(0);
            coinTossWagers[wagerIndex].user1wager = 0;
            coinTossWagers[wagerIndex].user2wager = 0;

            //emit so users on the web can tell who won.
            emit LogWithdrawal(winnerAddress, reward);
        }
    }

    /*
    When user clicks on the start game button.
  */
    //should this return false when fail?
    function enterContest(uint256 wagerIndex, uint256 wager) public payable {
        require(
            wagerIndex >= 0 && wagerIndex < 4,
            "Invalid wager index, must be between 0-3"
        );
        require(wager > 0, "Wager must be a positive number");
        require(msg.value == wager, "Amount sent must be equal to wager");

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
            } else {
                //error
                revert("Error entering into wager index, might be full");
            }
            executeWager(count);
        }
    }

    /*
    only if other player did not ready up yet. 
  */
    function leaveContest(uint256 wagerIndex) public {
        require(
            wagerIndex >= 0 && wagerIndex < 4,
            "Invalid wager index, must be between 0-3"
        );

        coinTossWager memory wagerSet = coinTossWagers[wagerIndex];
        if (wagerSet.user1 == msg.sender) {
            coinTossWagers[wagerIndex].user1 = address(0);
            coinTossWagers[wagerIndex].user1wager = 0;
        } else if (wagerSet.user2 == msg.sender) {
            coinTossWagers[wagerIndex].user2 = address(0);
            coinTossWagers[wagerIndex].user2wager = 0;
        } else {
            revert(
                "Error leaving contest, either incorrect user or incorrect wager index"
            );
        }
    }
}
