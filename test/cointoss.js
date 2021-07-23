const cointoss = artifacts.require("cointoss");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("cointoss", function (/* accounts */) {
  it("should assert true", async function () {
    await cointoss.deployed();
    return assert.isTrue(true);
  });


  //test entering contest player 1, player 2

  //test entering contest if full.
});
