const anchor = require("@project-serum/anchor");

anchor.setProvider(anchor.Provider.local())

async function main() {
    const program = anchor.workspace.AnchorTutorial

    await program.rpc.initialize()
}

console.log("Running client.")
main().then(() => console.log("Success"))
