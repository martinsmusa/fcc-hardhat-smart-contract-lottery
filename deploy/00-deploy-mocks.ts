import { ethers, network } from 'hardhat';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { developmentChains } from '../helper-hardhat-config';

const BASE_FEE = ethers.utils.parseEther('0.25'); // Cost 0.25 LINK
const GAS_PRICE_LINK = 1e9; // link per gas
const deployMocks = async (
    {
        getNamedAccounts,
        deployments: {
            deploy, log
        }
    }: HardhatRuntimeEnvironment
) => {
    const { deployer } = await getNamedAccounts();
    const { chainId } = network.config;
    const args = [BASE_FEE, GAS_PRICE_LINK];

    if (developmentChains.includes(network.name)) {
        log('Deploying mocks');

        await deploy(
            'VRFCoordinatorV2Mock',
            {
                from: deployer,
                log: true,
                args
            }
        );

        log('Mocks deployed');
        log('<----------------------------------------------------->');
    }
};

deployMocks.tags = ['mocks', 'all']
export default deployMocks;
