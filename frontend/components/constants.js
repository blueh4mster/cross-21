//abi,  chainSelectorMap, supportedChainsList,chainidMap, getDestinationChainList

export const abi = 
[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "router",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "router",
				"type": "address"
			}
		],
		"name": "InvalidRouter",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "messageId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "uint64",
				"name": "sourceChainSelector",
				"type": "uint64"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "sessionId",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "player_1",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "player_2",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "winner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "turn",
						"type": "address"
					},
					{
						"internalType": "uint8",
						"name": "player1Status",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "player2Status",
						"type": "uint8"
					}
				],
				"indexed": false,
				"internalType": "struct game21.GameSession",
				"name": "message",
				"type": "tuple"
			}
		],
		"name": "MessageReceived",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "messageId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "uint64",
				"name": "destinationChainSelector",
				"type": "uint64"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "sessionId",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "player_1",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "player_2",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "winner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "turn",
						"type": "address"
					},
					{
						"internalType": "uint8",
						"name": "player1Status",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "player2Status",
						"type": "uint8"
					}
				],
				"indexed": false,
				"internalType": "struct game21.GameSession",
				"name": "message",
				"type": "tuple"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "fees",
				"type": "uint256"
			}
		],
		"name": "MessageSent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "_router",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "acceptOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "messageId",
						"type": "bytes32"
					},
					{
						"internalType": "uint64",
						"name": "sourceChainSelector",
						"type": "uint64"
					},
					{
						"internalType": "bytes",
						"name": "sender",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "token",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "amount",
								"type": "uint256"
							}
						],
						"internalType": "struct Client.EVMTokenAmount[]",
						"name": "destTokenAmounts",
						"type": "tuple[]"
					}
				],
				"internalType": "struct Client.Any2EVMMessage",
				"name": "message",
				"type": "tuple"
			}
		],
		"name": "ccipReceive",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "playerStatus",
				"type": "uint8"
			}
		],
		"name": "checkWin",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "gameSessions",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "sessionId",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "player_1",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "player_2",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "turn",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "player1Status",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "player2Status",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLastReceivedMessageDetails",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "messageId",
				"type": "bytes32"
			},
			{
				"internalType": "uint64",
				"name": "sourceChainSelector",
				"type": "uint64"
			},
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "sessionId",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "player_1",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "player_2",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "winner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "turn",
						"type": "address"
					},
					{
						"internalType": "uint8",
						"name": "player1Status",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "player2Status",
						"type": "uint8"
					}
				],
				"internalType": "struct game21.GameSession",
				"name": "message",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumberOfReceivedMessages",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "number",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_sessionId",
				"type": "bytes32"
			}
		],
		"name": "getPlayer1",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_sessionId",
				"type": "bytes32"
			}
		],
		"name": "getPlayer1Status",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_sessionId",
				"type": "bytes32"
			}
		],
		"name": "getPlayer2",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_sessionId",
				"type": "bytes32"
			}
		],
		"name": "getPlayer2Status",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRouter",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getSessionId",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "messageDetail",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "sourceChainSelector",
				"type": "uint64"
			},
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "sessionId",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "player_1",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "player_2",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "winner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "turn",
						"type": "address"
					},
					{
						"internalType": "uint8",
						"name": "player1Status",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "player2Status",
						"type": "uint8"
					}
				],
				"internalType": "struct game21.GameSession",
				"name": "message",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "player",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "sessionId",
				"type": "bytes32"
			},
			{
				"internalType": "uint8",
				"name": "num",
				"type": "uint8"
			},
			{
				"internalType": "uint64",
				"name": "destinationChainSelector",
				"type": "uint64"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "move",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "receivedMessages",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "destinationChainSelector",
				"type": "uint64"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "sessionId",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "player_1",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "player_2",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "winner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "turn",
						"type": "address"
					},
					{
						"internalType": "uint8",
						"name": "player1Status",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "player2Status",
						"type": "uint8"
					}
				],
				"internalType": "struct game21.GameSession",
				"name": "message",
				"type": "tuple"
			}
		],
		"name": "sendMessage",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "messageId",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "sessionIds",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "destinationChainSelector",
				"type": "uint64"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "start",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "routerAddr",
				"type": "address"
			}
		],
		"name": "updateRouter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]
export const contractAddress = {
    'mumbai' : "0x31446338C0665986dec0D3D58b70a5e53164Cded",
    'bnb chain':"0xd8439e1583BF2fC6bC988f09Baf8816447d78C09"
}

export const chainSelectorMap = {
    'bnb chain': "13264668187771770619",
	'mumbai': "12532609583862916517",
}

const supportedChainsList = [
    { id: 97, name: 'bnb chain'},
    { id: 80001, name: 'mumbai' },
];

export const chainidMap = supportedChainsList.reduce((map, chain) => {
    map[chain.id] = chain.name;
    return map;
}, {});


export const getDestinationChainList = (chainId) => {
    let options = [];
    for(let i=0; i<supportedChainsList.length; i++){
        if(chainId != supportedChainsList[i].id){
            options.push({
                'label': supportedChainsList[i].name,
                'value': supportedChainsList[i].id
            });
        }
    }
    return options;
}


