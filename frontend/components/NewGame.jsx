import React, { useContext } from "react";
import { AppContext } from "../pages";
import button from '@chainlink/design-system/button.module.css';
import { useAccount, useSigner, useNetwork } from "wagmi";
import { useState } from "react";
import { Contract } from "alchemy-sdk";

function NewGame() {
    const {playerNumber,setPlayerNumber,setSessionId, destinationChain,setDestinationChain,
        text,setText, refreshBox,sessionId, num, setNum, intervalId, setIntervalId, 
        setDisabledCell,DisabledButton, setDisabledButton
    } = useContext(AppContext);

    const { address, isDisconnected } = useAccount();
    const { data: signer } = useSigner();
    const [txHash, setTxHash] = useState();
    const { chain, chains } = useNetwork();
    const [sessionIds, setSessionIds] = useState();

    const childToParent = (value) => {
        setDestinationChain(value[0])
        updateAvailableGameSessions()
    }

    const setSession = (value) => {
        setSessionId(value[0].value)
    }

    React.useEffect(() => {
        setBoardInterval()
    }, [playerChar]);

    async function getBoxStatus(){
        try{
            if(sessionId){
                const game21Contract = new Contract(contractAddress[chainedMap[chain.id]],abi, signer);
                // const BoxStatus = await game21Contract
            } else {
                return;
            }
        }catch(err){
            console.log(`error : ${err}`);
        }
    }

    const updateAvailableGameSessions = async() => {
        try{
            const destinationChainContract = new Contract(contractAddress[chainidMap[chain.id]], abi, signer)
            let sessionIds = await destinationChainContract.getActiveSessions();
            sessionIds = [...new Set(sessionIds)];
            let options = [];
            for(let i=0;i<sessionIds.length; i++){
                    options.push({
                        'label': sessionIds[i].slice(0,8),
                        'value': sessionIds[i]
                    })	
            }
            setSessionIds(options)
            setDisabledButton(false)    
        } catch (e) {
            console.log(e)
            return;
        }
    }

    const start = async()=> {
        setDisabledButton(true)
        const game21Contract = new Contract(contractAddress[chainidMap[chain.id]], abi, signer)
        setText("Starting the Game")
        try {
            const startGame = await game21Contract.start(chainSelectorMap[destinationChain.label], contractAddress[destinationChain.label])
            setTxHash(startGame.hash);
            await startGame.wait();
            setText("Game Started, Waiting for the other player on " + destinationChain.label + " to join.")
            setSessionId("")
            setTxHash(null);      
            setDisabledButton(false)
            setPlayerChar('O')
            setPlayerNumber(1)
            setBoardInterval()
            resetBoard()
        } catch (e) {
            console.log(e);
            return;
        }
    }
}
