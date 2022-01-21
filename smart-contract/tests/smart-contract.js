const anchor = require('@project-serum/anchor');

describe('smart-contract', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  it('Is initialized!', async () => {
    // Add your test here.
    const program = anchor.workspace.SmartContract;
    const tx = await program.rpc.initialize();
    console.log("Your transaction signature", tx);
  });
});
