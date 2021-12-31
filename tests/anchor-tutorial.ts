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

  it('error message matches', async () => {
    try {
      const tx = await program.rpc.hello()
      expect.fail('succeeded')
    } catch (e) {
      const errMsg = 'This is an error message clients will automatically display'
      expect(e.toString()).to.equal(errMsg)
    }
  })

});
