const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

const provider = anchor.Provider.local()

anchor.setProvider(provider)

async function main() {
    const program = anchor.workspace.AnchorTutorial

    const myAccount = anchor.web3.Keypair.generate()

    await program.rpc.initialize(new anchor.BN(1234), {
        accounts: {
            myAccount: myAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId
        },
        signers: [myAccount],
    })

    const account = await program.account.myAccount.fetch(myAccount.publicKey);

    console.log(account)
}

console.log("Running client.")
main().then(() => console.log("Success"))
