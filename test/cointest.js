const cointoss = artifacts.require('cointoss')

contract('cointoss', function () {
    let instance;

    it('should assert true', async function () {
        instance = await cointoss.deployed();
        return assert.isTrue(true);
    })

    const wagerIndex = 0;
    //enter player 1 in wager 0
    const player1address = '0x9700fe220d70303E91ed47f1C80319E30bEF4bfa';
    const player1Wager = 2;
    //enter player 2 in wager 0
    const player2address = '0x05Ea98B4e80277f43B8704fD93F96a4C8a9782f1';
    const player2wager = 1;

    //PLAYER 1
    //test player one entered
    it(`player 1 entered wagerIndex: ${wagerIndex}`, async function () {
        await instance.enterContest(wagerIndex, player1Wager, {
            from: player1address,
        })
        let result = await instance.coinTossWagers(wagerIndex);
        return assert.equal(player1address, result.user1);
    })

    it(`player 1 wager entered wagerIndex: ${wagerIndex}`, async function () {
        let result = await instance.coinTossWagers(wagerIndex);
        return assert.equal(player1Wager, result.user1wager);
    })

    //PLAYER 2
    //test player two entered
    it(`player 2 entered wagerIndex: ${wagerIndex}`, async function () {
        await instance.enterContest(wagerIndex, player2wager, {
            from: player2address,
        })
        let result = await instance.coinTossWagers(wagerIndex);
        return assert.equal(player2address, result.user2);
    })

    it(`player 2 wager entered wagerIndex: ${wagerIndex}`, async function () {
        let result = await instance.coinTossWagers(wagerIndex);
        return assert.equal(player2wager, result.user2wager);
    })

    //test each slot filled correctly
    it(`filling each wager slot out of 4`, async function () {
        //fill all wagers
        await instance.enterContest(1, player1Wager, {
            from: player1address,
        });
        await instance.enterContest(2, player1Wager, {
            from: player1address,
        });
        await instance.enterContest(3, player1Wager, {
            from: player1address,
        });
        await instance.enterContest(1, player2wager, {
            from: player2address,
        });
        await instance.enterContest(2, player2wager, {
            from: player2address,
        });
        await instance.enterContest(3, player2wager, {
            from: player2address,
        });

        let valid = true;
        //get all 4 wager slots
        let slot1 = await instance.coinTossWagers(1);        
        if(!(slot1.user1 == player1address && slot1.user1wager == player1Wager && slot1.user2 == player2address && slot1.user2wager == player2wager)){
            valid = false
        }
        let slot2 = await instance.coinTossWagers(2);
        if(!(slot2.user1 == player1address && slot2.user1wager == player1Wager && slot2.user2 == player2address && slot2.user2wager == player2wager)){
            valid = false
        }
        let slot3 = await instance.coinTossWagers(3);
        if(!(slot3.user1 == player1address && slot3.user1wager == player1Wager && slot3.user2 == player2address && slot3.user2wager == player2wager)){
            valid = false
        }
        
        return valid;
    })

    
    //test entering contest if full.
    let player3address = '0x7a86c9118D1b50e376b6B9FeeE1603940E5615f6';
    let player3wager = 5;
    it(`test joining full wager`, async function () {
        //will throw an error if its full so test is for error
        try{
            await instance.enterContest(0, player3wager, {
                from: player3address,
            })
            return false;
        }catch(error){
            return true;
        }
        
    })
    
    //test leave wager
    leave wager function is ready
    //then test execute coin flip

    need to do this after testing removing someone
    the catch will execute if its full too
    //then test negative wagers
    it(`test negative wager`, async function () {
        //will throw an error if its full so test is for error
        try{
            await instance.enterContest(0, -1, {
                from: player3address,
            })
            return false;
        }catch(error){
            return true;
        }
        
    })

    //test incorrecrt wagerIndex


})
