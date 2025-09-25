// import * as anchor from "@project-serum/anchor";
// import { readFileSync, writeFileSync } from "fs";
// import idl from "../idl.json";

// async function main() {
//   const connection = new anchor.web3.Connection(
//     "https://api.devnet.solana.com",
//     "processed"
//   );
//   const wallet = new anchor.Wallet(
//     JSON.parse(readFileSync(`${process.env.HOME}/.config/solana/id.json`, "utf-8"))
//   );
//   const provider = new anchor.AnchorProvider(connection, wallet, {
//     preflightCommitment: "processed",
//   });
//   anchor.setProvider(provider);

//   const programId = new anchor.web3.PublicKey("v8MHshkCyiotq3LWqewLL35j2sUsfVZuobyKd7SMK9s");

//   const program = new anchor.Program(idl as unknown as anchor.Idl, programId, provider);

//   const counter = anchor.web3.Keypair.generate();
//   console.log("Initializing counter with public key:", counter.publicKey.toBase58());

//   await program.methods
//     .initialize()
//     .accounts({
//       counter: counter.publicKey,
//       user: provider.wallet.publicKey,
//       systemProgram: anchor.web3.SystemProgram.programId,
//     })
//     .signers([counter])
//     .rpc();

//   writeFileSync(
//     "counter-keypair.json",
//     JSON.stringify(Array.from(counter.secretKey))
//   );

//   console.log("Counter initialized and keypair saved to counter-keypair.json");
// }

// main().catch(console.error);


import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com");
const counterPk = new PublicKey("8EDS5m8xnGLLgD4aU9NxNSD1zAT5MeGwMLurV8ZmmzKd");

(async () => {
  const info = await connection.getAccountInfo(counterPk);
  console.log(info ? "Account exists" : "Account not found");
})();
