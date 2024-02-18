// Home.js
// This component renders the Home page of the application.

// Import dependencies
import React, { useState, createContext, useEffect } from "react";
import { Contract } from "alchemy-sdk";
import { useSigner, useNetwork } from "wagmi";

// Import styles and components
import styles from "../styles/Home.module.css";
import Box from "../components/Box";
import NewGame from "../components/NewGame";
import Header from "../components/Header";
// import button from "@chainlink/design-system/button.module.css";
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

  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    // Set width on initial load
    setViewportWidth(window.innerWidth);

    // Listen for window resize and update width
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup the listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //game state variables
  const [currentChar, setCurrentChar] = useState("1"); // Stores the current player's character (X starts first)
  const [num, setNum] = useState(""); // Stores the current state of the number to be displayed to both users
  const [winner, setWinner] = useState(""); // Stores the winner of the game
  const [gameOver, setGameOver] = useState(false); // Boolean to signify if the game is over
  const [disabledCell, setDisabledCell] = useState(true); // Boolean to disable cells when game is over

  // Network state variables
  const { chain, chains } = useNetwork(); // Network information from wagmi
  const { data: signer } = useSigner(); // Signer data from wagmi
  const [destinationChain, setDestinationChain] = useState(); // Stores the selected destination chain

  // Player state variables
  const [playerNumber, setPlayerNumber] = useState(); // Stores the number assigned to the player

  // Session state variables
  const [sessionId, setSessionId] = useState(); // Stores the current game session ID

  // UI state variables
  let [text, setText] = useState(""); // Stores text to display to user
  const [disabledButton, setDisabledButton] = useState(true); // Boolean to disable button
  const [intervalId, setIntervalId] = useState(); // Stores the interval ID for setting and clearing intervals

  // move function
  const move = async (row, column) => {
    // Interacts with the smart contract deployed on the chain to record a move
    if (sessionId) {
      //generate a contract instance here
      // const TicTacToeContract = new Contract(
      //   contractAddress[chainidMap[chain.id]],
      //   abi,
      //   signer
      // );
      try {
        //need to tupdate the number in the box after the move is done , so we need the number to return in here
        // const move = await TicTacToeContract.move(
        //   row,
        //   column,
        //   playerNumber,
        //   sessionId,
        //   chainSelectorMap[destinationChain.label],
        //   contractAddress[destinationChain.label]
        // );
        setDisabledButton(true);
        setText("Communicating your move cross chain");
        //await move.wait();
        setText("Move Communicated, waiting for other player to make a move");
      } catch (e) {
        console.log(e);
        return;
      }
    }
  };

  function wincheck(numinbox) {
    return numinbox == 21;
  }
  function refreshBox() {}
  function handleClick() {}

  function resetBox() {
    setNum(0);
    clearInterval(intervalId);
    setCurrentChar("X");
  }
  // Render Home component
  return (
    <div>
      <main
        className={styles.main}
        style={{
          marginLeft: viewportWidth < 768 ? 10 : 0,
          width: viewportWidth > 768 ? "auto" : 440,
        }}
      >
        <AppContext.Provider
          value={{
            num,
            setNum,
            handleClick,
            winner,
            gameOver,
            disabledCell,
            setDisabledCell,
            playerNumber,
            setPlayerNumber,
            sessionId,
            setSessionId,
            destinationChain,
            setDestinationChain,
            text,
            setText,
            refreshBox,
            intervalId,
            setIntervalId,
            resetBox,
            disabledButton,
            setDisabledButton,
          }}
        >
          <Header />
          {/* <NewGame /> */}
        </AppContext.Provider>
        <br />
        <br />

        {/* <button onClick={() => resetBox()} style={{ width: "380px" }}>
          Reset
        </button> */}
      </main>
    </div>
  );
}
