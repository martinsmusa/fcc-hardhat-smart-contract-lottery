import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

export interface INetworkConfigItem {
    name?: string;
    subscriptionId?: string;
    gasLane?: string;
    keepersUpdateInterval?: string;
    raffleEntranceFee?: BigNumber;
    callbackGasLimit?: string;
    vrfCoordinatorV2?: string;
}

export interface INetworkConfigInfo {
    [key: number]: INetworkConfigItem;
}

export const networkConfig: INetworkConfigInfo = {
    31337: {
        name: 'localhost',
        subscriptionId: '588',
        gasLane: '0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c',
        keepersUpdateInterval: '30',
        raffleEntranceFee: ethers.utils.parseEther('0.1'),
        callbackGasLimit: '500000'
    },
    11155111: {
        name: 'sepolia',
        // subscription id is not valid, did not test on testnet.
        subscriptionId: '588',
        gasLane: '0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c',
        keepersUpdateInterval: '30',
        raffleEntranceFee: ethers.utils.parseEther('0.01'),
        callbackGasLimit: '500000',
        vrfCoordinatorV2: '0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625'
    }
};

export const developmentChains = ['hardhat', 'localhost']
