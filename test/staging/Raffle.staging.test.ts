import { assert, expect } from 'chai';
import { BigNumber } from 'ethers';
import { deployments, ethers, getNamedAccounts, network } from 'hardhat';
import { developmentChains, networkConfig } from '../../helper-hardhat-config';
import { Raffle } from '../../typechain-types';

/**
 * THIS IS NOT TESTED ON TESTNET, SUBSCRIPTION ID IS NOT VALID
 */
developmentChains.includes(network.name)
    ? describe.skip
    : describe('Raffle unit tests', () => {
        const chainId = network.config.chainId;
        const { keepersUpdateInterval, raffleEntranceFee } = networkConfig[chainId!];
        let raffle: Raffle,
            entranceFee: BigNumber,
            deployer: string;

        beforeEach(async () => {
            deployer = (await getNamedAccounts()).deployer;
            await deployments.fixture(['all']);

            raffle = await ethers.getContract('Raffle', deployer);
            entranceFee = await raffle.getEntranceFee();
        });

        describe('fulfillRandomWords', () => {
            it('Works with live chainlink keepers and chainlink vrf, we get a random winner', async () => {
                const startingTimestamp = await raffle.getLastTimeStamp();
                const accounts = await ethers.getSigners();
                const winnerStartingBalance = await accounts[0].getBalance();

                await new Promise(async (resolve, reject) => {
                    raffle.once('WinnerPicked', async (event) => {
                        console.log('winner picked, event fired');

                        try {
                            const recentWinner = await raffle.getRecentWinner();
                            const raffleState = await raffle.getRaffleState();
                            const winnerEndingBalance = await accounts[0].getBalance();
                            const endingTimeStamp = await raffle.getLastTimeStamp();

                            await expect(raffle.getPlayer(0)).to.be.reverted;
                            assert.equal(recentWinner, accounts[0].address);
                            assert.equal(raffleState.toString(), '0');
                            assert.equal(
                                winnerEndingBalance.toString(),
                                winnerStartingBalance.add(raffleEntranceFee!).toString()
                            );
                            assert(endingTimeStamp > startingTimestamp);

                            resolve(event);
                        } catch (err) {
                            console.error(err);
                            reject(err);
                        }
                    });

                    await raffle.enterRaffle({ value: raffleEntranceFee });
                });
            });
        });
    });