# Counter DApp (Solana + Anchor + React)

This is a simple decentralized application (DApp) built on the Solana blockchain using **Anchor framework** for the smart contract and **React (Vite + TypeScript)** for the frontend.

The app demonstrates a basic **Counter program** where a user can:
- Initialize a counter account.
- Increment and decrement the counter.
- Multiply and divide the counter value.

---

## Tech Stack

- **Solana Web3.js**
- **Anchor Framework**
- **React + Vite + TypeScript**
- **Wallet Adapter (Phantom)**

---

## Setup Instructions

### 1. Clone the repository
```
git clone <your-repo-url>
cd counter-dapp
```
### 2. Configure Solana to Devnet
```
solana config set --url devnet
```
### 3. Build and Deploy the Smart Contract
```
anchor build
anchor deploy
anchor test
```
### 4. Setup Frontend (React + Vite)
```
cd app
npm install
npm install @solana/web3.js @project-serum/anchor \
  @solana/wallet-adapter-base @solana/wallet-adapter-react \
  @solana/wallet-adapter-wallets @solana/wallet-adapter-react-ui
```

### 5. Run Frontend
```
npm run dev
```

### Features

- Connect Phantom Wallet
- Initialize counter account
- Increment, Decrement, Multiply and Divide the counter
- Refresh to fetch latest counter value

### Project Structure
```
counter-dapp/
│
├── programs/              # Anchor program (smart contract)
│   └── counter_dapp/      
│
├── app/                   # React frontend
│   ├── src/
│   │   ├── App.tsx
│   │   ├── Counter.tsx
│   │   ├── idl.json       # Anchor IDL file
│   │   └── counter_dapp.ts
│   └── package.json
│
├── Anchor.toml
├── Cargo.toml
└── README.md
```

### Prerequisites

- Solana CLI installed
- Anchor framework installed
- Node.js and npm installed
- Phantom wallet installed in browser

git clone <your-repo-url>
cd counter-dapp
