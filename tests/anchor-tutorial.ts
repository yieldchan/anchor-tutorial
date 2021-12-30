import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { AnchorTutorial } from '../target/types/anchor_tutorial';

describe('anchor-tutorial', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.AnchorTutorial as Program<AnchorTutorial>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
