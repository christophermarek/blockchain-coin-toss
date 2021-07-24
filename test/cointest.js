const cointoss = artifacts.require('cointoss')

contract('cointoss', function (/* accounts */) {
    let instance;

    it('should assert true', async function () {
        instance = await cointoss.deployed();
        return assert.isTrue(true);
    })

    const wagerIndex = 0;
    //enter player 1 in wager 0
    const player1address = '0x9700fe220d70303e91ed47f1c80319e30bef4bfa';
    const player1Wager = 2;
    //enter player 2 in wager 0
    const player2address = '0x05ea98b4e80277f43b8704fd93f96a4c8a9782f1';
    const player2wager = 1;

    //test player one entered
    it('player 1 entered', async function () {
        await instance.enterContest(wagerIndex, player1Wager, {
            from: player1address,
        })
        console.log(await instance.methods);
        console.log("########");
        console.log("########");
        console.log("########");
        console.log("########");
        console.log(await instance.methods.coinTossWagers.call());
        //await cointoss.methods.coinTossWagers.call();
    })

    //instance.enterContest(wagerIndex, player2Wager, { from: player2address });

    //test entering contest if full.
})
