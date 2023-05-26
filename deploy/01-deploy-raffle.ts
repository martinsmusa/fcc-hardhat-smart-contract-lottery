import { ethers, network } from 'hardhat';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { verify } from '../utils/verify';
import { VRFCoordinatorV2Mock } from '../typechain-types';
import { developmentChains, networkConfig } from '../helper-hardhat-config';

const VRF_SUB_FUND_AMOUNT = ethers.utils.parseEther('2');

const deployRaffle = async (
    {
        getNamedAccounts,
        deployments: {
            deploy, log
        }
    }: HardhatRuntimeEnvironment
) => {
    const { deployer } = await getNamedAccounts();
    const { chainId } = network.config;
    let vrfCoordinatorV2Address: string,
        subscriptionId: string;

    if (developmentChains.includes(network.name)) {
        const VRFCoordinatorV2Mock: VRFCoordinatorV2Mock = await ethers.getContract('VRFCoordinatorV2Mock');
        const txRes = await VRFCoordinatorV2Mock.createSubscription();
        const txReceipt = await txRes.wait(1);

        vrfCoordinatorV2Address = VRFCoordinatorV2Mock.address;
        subscriptionId = txReceipt.events?.[0]?.args?.subId;

        await VRFCoordinatorV2Mock.fundSubscription(subscriptionId, VRF_SUB_FUND_AMOUNT);
    } else {
        const { vrfCoordinatorV2, subscriptionId: subscriptionIdConfig } = networkConfig[chainId as number];
        vrfCoordinatorV2Address = vrfCoordinatorV2!;
        subscriptionId = subscriptionIdConfig!;
    }

    const {
        raffleEntranceFee, gasLane, callbackGasLimit, keepersUpdateInterval
    } = networkConfig[chainId as number];
    const args = [
        vrfCoordinatorV2Address, raffleEntranceFee, gasLane, subscriptionId, callbackGasLimit, keepersUpdateInterval
    ];

    const raffle = await deploy(
        'Raffle',
        {
            from: deployer,
            log: true,
            args,
            waitConfirmations: 1
        }
    );

    if(developmentChains.includes(network.name)){
        const vrfCoordinatorV2 = await ethers.getContract(
            "VRFCoordinatorV2Mock"
        );
        await vrfCoordinatorV2.addConsumer(subscriptionId, raffle.address);
    }

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log('Verifying');
        await verify(raffle.address, args);
    }

    log('<----------------------------------------------------->');
};

deployRaffle.tags = ['all', 'raffle'];
export default deployRaffle;
