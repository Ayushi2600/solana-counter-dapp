import React, { useState, useEffect } from "react";
import {
  useWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import type { WalletContextState } from "@solana/wallet-adapter-react";
import {
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider, setProvider } from "@coral-xyz/anchor";
import type { CounterDapp } from "./counter_dapp";
import idl from "./idl.json";
import type { Wallet } from "@coral-xyz/anchor";

const idl_object = idl;

export default function Counter() {
const { connected, ...ourWallet } = useWallet() as WalletContextState & Wallet;
  const { connection } = useConnection();
  const [value, setValue] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const counterPk = new PublicKey(
    "8EDS5m8xnGLLgD4aU9NxNSD1zAT5MeGwMLurV8ZmmzKd"
  );

  const getProvider = () => {
    const provider = new AnchorProvider(
      connection,
      ourWallet,
      AnchorProvider.defaultOptions()
    );
    setProvider(provider);
    return provider;
  };

  const incrementCounter = async () => {
    try {
      setLoading(true);
      const anchProvider = getProvider();
      const program = new Program<CounterDapp>(idl_object, anchProvider);

      const txSig = await program.methods
        .increment()
        .accounts({ counter: counterPk })
        .rpc({ skipPreflight: true });
      console.log("Confirmed tx:", txSig);

      await getCounter();
    } catch (err: any) {
      console.error("Increment error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const decrementCounter = async () => {
    try {
      setLoading(true);
      const anchProvider = getProvider();
      const program = new Program<CounterDapp>(idl_object, anchProvider);

      const txSig = await program.methods
        .decrement()
        .accounts({ counter: counterPk })
        .rpc({ skipPreflight: true });
      console.log("Confirmed tx:", txSig);

      await getCounter();
    } catch (err: any) {
      console.error("Decrement error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const multipleCounterBy2 = async () => {
    try {
      setLoading(true);
      const anchProvider = getProvider();
      const program = new Program<CounterDapp>(idl_object, anchProvider);

      const txSig = await program.methods
        .multiply()
        .accounts({ counter: counterPk })
        .rpc({ skipPreflight: true });
      console.log("Confirmed tx:", txSig);

      await getCounter();
    } catch (err: any) {
      console.error("Increment error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const divideCounterBy2 = async () => {
    try {
      setLoading(true);
      const anchProvider = getProvider();
      const program = new Program<CounterDapp>(idl_object, anchProvider);

      const txSig = await program.methods
        .divide()
        .accounts({ counter: counterPk })
        .rpc({ skipPreflight: true });
      console.log("Confirmed tx:", txSig);

      await getCounter();
    } catch (err: any) {
      console.error("Increment error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCounter = async () => {
    try {
      setLoading(true);
      setError(null);

      const counterInfo = await connection.getAccountInfo(counterPk);
      if (!counterInfo) {
        console.log("Counter account does not exist yet.");
        setValue(null);
        return;
      }

      const anchProvider = getProvider();
      const program = new Program<CounterDapp>(idl_object, anchProvider);

      const account = await program.account.counter.fetch(counterPk);
      setValue(account.value.toNumber());
    } catch (err: any) {
      console.error("Error fetching counter:", err);
      setValue(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (connected) getCounter();
  }, [connected]);

  return (
    <div className="p-4">
      <WalletMultiButton />
      {connected ? (
        <>
          <h2 className="mt-4">
            Counter Value: {loading ? "Loading..." : value ?? "Not initialized"}
          </h2>
          <div className="flex gap-5 mt-4">
            <button
              onClick={incrementCounter}
              disabled={loading || !connected || value === null}
            >
              +1
            </button>
            <button
              onClick={decrementCounter}
              disabled={loading || !connected || value === null}
            >
              -1
            </button>
            <button
              onClick={multipleCounterBy2}
              disabled={loading || !connected || value === null}
            >
              x2
            </button>
            <button
              onClick={divideCounterBy2}
              disabled={loading || !connected || value === null}
            >
              /2
            </button>
          </div>
          <button
            className="mt-4"
            onClick={getCounter}
            disabled={loading || !connected}
          >
            Refresh
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      ) : (
        <h2 className="mt-4 text-red-500">Please connect your wallet.</h2>
      )}
    </div>
  );
}