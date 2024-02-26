import React, { useContext } from "react";
import { AppContext } from "../pages";
import button from "@chainlink/design-system/button.module.css";
import {
  abi,
  contractAddress,
  chainSelectorMap,
  getDestinationChainList,
  chainidMap,
} from "./constants";
import { useAccount, useSigner, useNetwork } from "wagmi";
import { useState } from "react";
import { Contract } from "alchemy-sdk";
import { List } from "./List";

function NewGame() {
  const {
    playerNumber,
    setPlayerNumber,
    setSessionId,
    destinationChain,
    setDestinationChain,
    text,
    setText,
    refreshBox,
    sessionId,
    currNum,
    setCurrNum,
    intervalId,
    setIntervalId,
    setDisabledCell,
    disabledButton,
    setDisabledButton,
  } = useContext(AppContext);

  const { address, isDisconnected } = useAccount();
  const { data: signer } = useSigner();
  const [txHash, setTxHash] = useState();
  const { chain, chains } = useNetwork();
  const [sessionIds, setSessionIds] = useState();

  const childToParent = (value) => {
    setDestinationChain(value[0]);
    updateAvailableGameSessions();
  };

  const setSession = (value) => {
    setSessionId(value[0].value);
  };

  // React.useEffect(() => {
  //     setBoardInterval()
  // }, [playerChar]);
  async function getBoxStatus() {
    try {
      if (sessionId) {
        const game21Contract = new Contract(
          contractAddress[chainidMap[chain.id]],
          abi,
          address
        );
      } else {
        return;
      }
    } catch (err) {
      console.log(`error : ${err}`);
    }
  }

  const updateAvailableGameSessions = async () => {
    try {
      const destinationChainContract = new Contract(
        contractAddress[chainidMap[chain.id]],
        abi,
        signer
      );
      let sessionIdS = await destinationChainContract.getSessionId();
      let options = [];
      options.push({
        label: sessionIdS.slice(0, 8),
        value: sessionIdS,
      });
      setSessionIds(options);
      setDisabledButton(false);
    } catch (e) {
      console.log(e);
      return;
    }
  };

  const start = async () => {
    setDisabledButton(true);
    const game21Contract = new Contract(
      contractAddress[chainidMap[chain.id]],
      abi,
      signer
    );
    setText("Starting the Game");
    try {
      const startGame = await game21Contract.start(
        chainSelectorMap[destinationChain.label],
        contractAddress[destinationChain.label]
      );
      setTxHash(startGame.hash);
      await startGame.wait(1);
      setText(
        "Game Started, Waiting for the other player on " +
          destinationChain.label +
          " to join."
      );
      setSessionId("");
      setTxHash(null);
      setDisabledButton(false);
      setPlayerNumber("1");
      resetBoard();
    } catch (e) {
      console.log(e);
      return;
    }
  };

  const setPlayerDetails = async () => {
    const game21Contract = new Contract(
      contractAddress[chainidMap[chain.id]],
      abi,
      signer
    );
    let gameSession = await game21Contract.gameSessions(sessionId);
    let zero_address = "0x0000000000000000000000000000000000000000";

    if (address == gameSession["player_1"]) {
      setPlayerNumber("1");
      if (gameSession["player_2"] == zero_address) {
        setText("Rejoined as Player 1");
      }
    } else if (
      address == gameSession["player_2"] ||
      gameSession["player_2"] == zero_address
    ) {
      setPlayerNumber("2");
    }
  };

  const join = async () => {
    setText("Joining");
    setPlayerDetails();
    setText("Joined the game. Refreshing the box!");
  };

  return (
    <div
      className="card"
      style={{ marginBottom: "10px", paddingBottom: "0px" }}
    >
      {chain ? (
        <List
          text="Select Destination chain to play with"
          options={getDestinationChainList(chain.id)}
          childToParent={childToParent}
        />
      ) : (
        <List
          options={getDestinationChainList(0)}
          childToParent={childToParent}
        />
      )}
      {destinationChain ? (
        <List
          text="Select a session"
          options={sessionIds}
          childToParent={setSession}
        />
      ) : (
        ""
      )}
      <section style={{ marginTop: "10px" }}>
        <button
          className={button.primary}
          onClick={() => start()}
          disabled={disabledButton}
        >
          Start a New Game
        </button>
        <button
          className={button.primary}
          onClick={() => join()}
          style={{ marginLeft: "20px" }}
          disabled={disabledButton}
        >
          Join a Game
        </button>
      </section>
      <h3 style={{ textAlign: "center", fontSize: "10px" }}>
        {text ? text : ""}
      </h3>
    </div>
  );
}

export default NewGame;
