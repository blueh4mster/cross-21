// Home.js
// This component renders the Home page of the application.

// Import dependencies
import React, { useState, createContext, useEffect } from "react";
import { Contract } from "alchemy-sdk";
import { useSigner, useNetwork } from "wagmi";

// Import styles and components
import styles from "../styles/Home.module.css";
// import Board from "../components/Board";
import NewGame from "../components/NewGame";
import Header from "../components/Header";
import button from "@chainlink/design-system/button.module.css";
import "@chainlink/design-system/global-styles.css";

// Import constants
import {
  abi,
  contractAddress,
  chainSelectorMap,
  chainidMap,
} from "../components/constants";

// Create a Context for sharing state between components
export const AppContext = createContext();

// Home component
export default function Home() {
  // Define initial states using the useState hook
  // Provide functionality to handle viewport width changes
  // Include game state management and interaction with alchemy-sdk

  // Render Home component
  return (
    <div>
      <main className={styles.main}>
        <AppContext.Provider value={{}}>
          <Header />
          <NewGame />
        </AppContext.Provider>
        <br />
      </main>
    </div>
  );
}
