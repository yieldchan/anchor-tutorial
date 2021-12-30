import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { expect } from 'chai'

import { AnchorTutorial } from '../target/types/anchor_tutorial';

const { SystemProgram } = anchor.web3

describe('anchor-tutorial', () => {

  const provider = anchor.Provider.env()
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  const program = anchor.workspace.AnchorTutorial as Program<AnchorTutorial>;
  const myAccount = anchor.web3.Keypair.generate()

  it('Is initialized!', async () => {

    const tx = await program.rpc.initialize(new anchor.BN(1234), {
      accounts: {
        myAccount: myAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId
      },
      signers: [myAccount]
    })

    console.log("Your transaction signature", tx);

    const account = await program.account.myAccount.fetch(myAccount.publicKey);
    expect(account.data.eq(new anchor.BN(1234)))
  });

  it('account updated', async () => {
    const tx = await program.rpc.update(new anchor.BN(6789), {
      accounts: {
        myAccount: myAccount.publicKey,
      }
    })

    console.log(`Transaction sig ${tx}`)

    const account = await program.account.myAccount.fetch(myAccount.publicKey)
    expect(account.data.eq(new anchor.BN(6789)))
  })
});
