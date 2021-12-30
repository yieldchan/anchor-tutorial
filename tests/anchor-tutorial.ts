import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { expect } from 'chai'

import { AnchorTutorial } from '../target/types/anchor_tutorial'
import { PuppetMaster } from '../target/types/puppet_master'

const { SystemProgram } = anchor.web3

describe('anchor-tutorial', () => {

  const provider = anchor.Provider.env()
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  const program = anchor.workspace.AnchorTutorial as Program<AnchorTutorial>
  const masterProgram = anchor.workspace.PuppetMaster as Program<PuppetMaster>
  const counter = anchor.web3.Keypair.generate()

  it('performs CPI from master to anchor tutorial', async () => {

    const newPuppetAccount = anchor.web3.Keypair.generate()

    await program.rpc.initialize({
      accounts: {
        puppet: newPuppetAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId
      },
      signers: [newPuppetAccount]
    })

    await masterProgram.rpc.pullStrings(new anchor.BN(1234), {
      accounts: {
        puppet: newPuppetAccount.publicKey,
        anchorTutorialProgram: program.programId,
      }
    })

    const puppetAccount = await program.account.data.fetch(newPuppetAccount.publicKey)

    expect(puppetAccount.data.eq(new anchor.BN(1234)))
  })

});
