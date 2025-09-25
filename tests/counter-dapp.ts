import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CounterDapp } from "../target/types/counter_dapp";

describe("counter-dapp", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.getProvider();

  const program = anchor.workspace.counterDapp as Program<CounterDapp>;

  it("Is initialized!", async () => {
    const counter = anchor.web3.Keypair.generate(); 
    await program.methods
      .initialize()
      .accounts({
        counter: counter.publicKey, // use this new keypair
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([counter]) // must include counter keypair as signer
      .rpc();
      
      console.log("Counter account public key:", counter.publicKey.toBase58());
  });
});
