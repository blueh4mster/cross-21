// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol";

contract game21 is CCIPReceiver, OwnerIsCreator {

    constructor(address router) CCIPReceiver(router) {
    }

    struct GameSession {
        bytes32 sessionId;
        address player_1; // player who starts the game
        address player_2; // the other player in the game
        address winner; // winner of game
        address turn; // check who takes action in next step
        uint8 player1Status; // current status for player 1
        uint8 player2Status; // current status for player 2
    }

    mapping(bytes32 => GameSession) public gameSessions;
    bytes32[] public sessionIds;

    uint8 initialStatus = 0;

    function getPlayer1Status(bytes32 _sessionId) external view returns (uint8) {
        return gameSessions[_sessionId].player1Status;
    }

    function getPlayer2Status(bytes32 _sessionId) external view returns (uint8) {
        return gameSessions[_sessionId].player2Status;
    }

    function getPlayer1(bytes32 _sessionId) external view returns (address) {
        return gameSessions[_sessionId].player_1;
    }
    
    function getPlayer2(bytes32 _sessionId) external view returns (address) {
        return gameSessions[_sessionId].player_2;
    }

    function getSessionId() external view returns (bytes32) {
        uint idx = sessionIds.length -1;
        return sessionIds[idx];
    }

    event MessageSent(
        bytes32 indexed messageId, // The unique ID of the message.
        uint64 indexed destinationChainSelector, // The chain selector of the destination chain.
        address receiver, // The address of the receiver on the destination chain.
        GameSession message, // The message being sent.
        uint256 fees // The fees paid for sending the message.
    );

    // Event emitted when a message is received from another chain.
    event MessageReceived(
        bytes32 indexed messageId, // The unique ID of the message.
        uint64 indexed sourceChainSelector, // The chain selector of the source chain.
        address sender, // The address of the sender from the source chain.
        GameSession message // The message that was received.
    );

    struct Message {
        uint64 sourceChainSelector; // The chain selector of the source chain.
        address sender; // The address of the sender.
        GameSession message; // The content of the message.
    }

    // Storage variables
    bytes32[] public receivedMessages; // Array to keep track of the IDs of received messages.
    mapping(bytes32 => Message) public messageDetail; // Mapping from message ID to Message struct, storing details of each received message.
    address public _router;

    function updateRouter(address routerAddr) external {
        _router = routerAddr;
    }

    function sendMessage(
        uint64 destinationChainSelector,
        address receiver,
        GameSession memory message
    ) public returns (bytes32 messageId) {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver), // ABI-encoded receiver address
            data: abi.encode(message), // ABI-encoded string message
            tokenAmounts: new Client.EVMTokenAmount[](0), // Empty array indicating no tokens are being sent
            extraArgs: Client._argsToBytes(
                Client.EVMExtraArgsV1({gasLimit: 400_000}) // Additional arguments, setting gas limit and non-strict sequency mode
            ),
            feeToken: address(0) // Setting feeToken to zero address, indicating native asset will be used for fees
        });

        // Initialize a router client instance to interact with cross-chain router
        IRouterClient router = IRouterClient(_router);

        // Get the fee required to send the message
        uint256 fees = router.getFee(destinationChainSelector, evm2AnyMessage);

        // Send the message through the router and store the returned message ID
        messageId = router.ccipSend{value: fees}(
            destinationChainSelector,
            evm2AnyMessage
        );

        // Emit an event with message details
        emit MessageSent(
            messageId,
            destinationChainSelector,
            receiver,
            message,
            fees
        );

        // Return the message ID
        return messageId;
    }

    function start(uint64 destinationChainSelector, address receiver) external {
        bytes32 uniqueId = keccak256(abi.encode(block.timestamp, msg.sender));
        sessionIds.push(uniqueId);
        gameSessions[uniqueId]= GameSession(
            uniqueId,
            msg.sender,
            address(0),
            address(0),
            msg.sender,
            initialStatus,
            initialStatus
            );

        sendMessage(destinationChainSelector, receiver, gameSessions[uniqueId]);
    }

    function checkWin(uint8 playerStatus ) public pure returns (bool) {
        return (playerStatus == 21);
    }

    function move(uint player, bytes32 sessionId, uint8 num, uint64 destinationChainSelector, address receiver) public {
        GameSession memory gs = gameSessions[sessionId];
        // make sure the game session setup and not over.
        require(gs.player_1 != address(0), "the session is not setup, please start game first!");
        require(gs.winner == address(0), "the game is over");
        
        // make sure the player is in the game session
        require(player == 1 || player == 2, "you must be player1 or player2");

        if (player == 1){
            require(gs.player_1 == msg.sender && gs.turn == msg.sender, "it is not your turn"); //make sure that it's player 1 turn
            if ((num - gameSessions[sessionId].player2Status) <= 3) { //make sure that the player chose an appropriate number
                gameSessions[sessionId].player1Status = num; //set the status as the new number

                //check if player has won and set as winner if true
                if (checkWin(gameSessions[sessionId].player1Status)) {
                    gameSessions[sessionId].winner = gameSessions[sessionId].player_1;
                } else {
                    gameSessions[sessionId].turn = gameSessions[sessionId].player_2; //change turn if false
                }
                sendMessage(destinationChainSelector, receiver, gameSessions[sessionId]); //send message 

            } else {
                revert("Wrong choice! You can only choose to increment the number by 1, 2 or 3.");
            }
            //same as above with player
        } else if (player == 2) {
            require(gs.player_2 == msg.sender && gs.turn == msg.sender, "it is not your turn");
            if ((num - gameSessions[sessionId].player1Status) <= 3) {
                gameSessions[sessionId].player2Status = num;

                if (checkWin(gameSessions[sessionId].player2Status)) {
                    gameSessions[sessionId].winner = gameSessions[sessionId].player_2;
                } else {
                    gameSessions[sessionId].turn = gameSessions[sessionId].player_1;
                }
                sendMessage(destinationChainSelector, receiver, gameSessions[sessionId]);

            } else {
                revert("Wrong choice! You can only choose to increment the number by 1, 2 or 3.");
            }
        }

    }

    function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal override {
        bytes32 messageId = any2EvmMessage.messageId; // fetch the messageId
        uint64 sourceChainSelector = any2EvmMessage.sourceChainSelector; // fetch the source chain identifier (aka selector)
        address sender = abi.decode(any2EvmMessage.sender, (address)); // abi-decoding of the sender address
        GameSession memory message = abi.decode(any2EvmMessage.data, (GameSession)); // abi-decoding of the sent string message
        receivedMessages.push(messageId);
        Message memory detail = Message(sourceChainSelector, sender, message);
        messageDetail[messageId] = detail;
        gameSessions[message.sessionId] = message;
        sessionIds.push(message.sessionId);

        emit MessageReceived(messageId, sourceChainSelector, sender, message);
    }

    function getNumberOfReceivedMessages()
        external
        view
        returns (uint256 number)
    {
        return receivedMessages.length;
    }

    function getLastReceivedMessageDetails()
        external
        view
        returns (
            bytes32 messageId,
            uint64 sourceChainSelector,
            address sender,
            GameSession memory message
        )
    {
        // Revert if no messages have been received
        if (receivedMessages.length == 0) revert();

        // Fetch the last received message ID
        messageId = receivedMessages[receivedMessages.length - 1];

        // Fetch the details of the last received message
        Message memory detail = messageDetail[messageId];

        return (
            messageId,
            detail.sourceChainSelector,
            detail.sender,
            detail.message
        );
    }

    receive() external payable { }

    function withdraw(address _address) public onlyOwner {
        uint256 amount = address(this).balance;
        if (amount == 0) revert ();

        // Attempt to send the funds, capturing the success status and discarding any return data
        (bool sent, ) = _address.call{value: amount}("");

        // Revert if the send failed, with information about the attempted transfer
        if (!sent) revert ();
    }
}