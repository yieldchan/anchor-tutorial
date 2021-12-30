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
  const counter = anchor.web3.Keypair.generate()

  it('creates a counter', async () => {
    const tx = await program.rpc.create(provider.wallet.publicKey, {
      accounts: {
        counter: counter.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId
      },
      signers: [counter]
    })

    console.log("Your transaction signature", tx);

    const account = await program.account.counter.fetch(counter.publicKey);

    expect(account.authority.equals(provider.wallet.publicKey))
    expect(account.count.toNumber()).to.equal(0)
  })

  it('increments a counter', async () => {
    const tx = await program.rpc.increment({
      accounts: {
        counter: counter.publicKey,
        authority: provider.wallet.publicKey,
      }
    })
    const tx2 = await program.rpc.increment({
      accounts: {
        counter: counter.publicKey,
        authority: provider.wallet.publicKey,
      }
    })

    console.log(`Transaction sig ${tx}`)
    console.log(`Transaction sig ${tx2}`)

    const account = await program.account.counter.fetch(counter.publicKey)
    expect(account.authority.equals(provider.wallet.publicKey))
    expect(account.count.toNumber()).to.equal(2)
  })
});
