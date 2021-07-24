const cointoss = artifacts.require('cointoss')

contract('cointoss', function (/* accounts */) {
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

    //test player one entered
    it('player 1 entered', async function () {
        await instance.enterContest(wagerIndex, player1Wager, {
            from: player1address,
        })
        let result = await instance.coinTossWagers(0);
        //console.log(await instance.coinTossWagers(0));
        console.log(Object.keys(result));
        console.log(result.user1);
        return assert.equal(player1address, result.user1);

        //console.log(await instance.coinTossWagers(0));
        //await cointoss.methods.coinTossWagers.call();
    })

    //instance.enterContest(wagerIndex, player2Wager, { from: player2address });

    //test entering contest if full.
})
