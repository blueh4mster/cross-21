//abi,  chainSelectorMap, supportedChainsList,chainidMap, getDestinationChainList


export const contractAddress = {
}

export const chainSelectorMap = {
    'sepolia': "16015286601757825753",
    'goerli': "2664363617261496610",
    'fuji': "14767482510784806043",
	'mumbai': "12532609583862916517"
}

const supportedChainsList = [
    { id: 11155111, name: 'sepolia' },
    { id: 43113, name: 'fuji' },
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


