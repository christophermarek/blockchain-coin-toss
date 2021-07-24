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

    //PLAYER 1
    //test player one entered
    it(`player 1 entered wagerIndex: ${wagerIndex}`, async function () {
        await instance.enterContest(wagerIndex, player1Wager, {
            from: player1address,
        })
        let result = await instance.coinTossWagers(wagerIndex);
        //console.log(await instance.coinTossWagers(0));
        //console.log(Object.keys(result));
        //console.log(result.user1);
        return assert.equal(player1address, result.user1);
        //console.log(await instance.coinTossWagers(0));
        //await cointoss.methods.coinTossWagers.call();
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


    //test entering contest if full.
})
