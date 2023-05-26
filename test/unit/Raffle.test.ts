import { assert, expect } from 'chai';
import { BigNumber } from 'ethers';
import { deployments, ethers, getNamedAccounts, network } from 'hardhat';
import { developmentChains, networkConfig } from '../../helper-hardhat-config';
import { Raffle, VRFCoordinatorV2Mock } from '../../typechain-types';

!developmentChains.includes(network.name)
    ? describe.skip
    : describe('Raffle unit tests',
        () => {
            const chainId = network.config.chainId;
            const { keepersUpdateInterval, raffleEntranceFee } = networkConfig[chainId!];
            let raffle: Raffle,
                vrfCoordinatorV2Mock: VRFCoordinatorV2Mock,
                entranceFee: BigNumber,
                interval: BigNumber,
                deployer: string;

            beforeEach(async () => {
                deployer = (await getNamedAccounts()).deployer;
                await deployments.fixture(['all']);

                raffle = await ethers.getContract('Raffle', deployer);
                vrfCoordinatorV2Mock = await ethers.getContract('VRFCoordinatorV2Mock', deployer);
                entranceFee = await raffle.getEntranceFee();
                interval = await raffle.getInterval();
            });

            describe('Constructor', () => {
                it('Initializes the raffle contract', async () => {
                    const raffleState = await raffle.getRaffleState();
                    const interval = await raffle.getInterval();

                    expect(raffleState.toString()).to.equal('0');
                    expect(interval.toString()).to.equal(keepersUpdateInterval);
                });
            });

            describe('Enter raffle', () => {
                it('Reverts if You do not pay enough', async () => {
                    await expect(raffle.enterRaffle()).to.be
                        .revertedWithCustomError(raffle, 'Raffle__NotEnoughEthEntered');
                });

                it('Records players when they enter the raffle', async () => {
                    await raffle.enterRaffle({ value: raffleEntranceFee });
                    const firstPlayer = raffle.getPlayer(0);
                    assert(firstPlayer, deployer);
                });

                it('Emits event on enter', async () => {
                    await expect(raffle.enterRaffle({ value: raffleEntranceFee })).to.emit(raffle, 'RaffleEnter');
                });

                it('Prevents entrance when raffle not open', async () => {
                    await raffle.enterRaffle({ value: raffleEntranceFee });
                    await network.provider.send('evm_increaseTime', [interval.add(1).toNumber()]);
                    await network.provider.send('evm_mine', []);
                    await raffle.performUpkeep([]);

                    await expect(raffle.enterRaffle({ value: raffleEntranceFee })).to.be
                        .revertedWithCustomError(raffle, 'Raffle__NotOpen');
                });
            });

            describe('checkUpkeep', () => {
                it('return false if there is no eth', async () => {
                    await network.provider.send('evm_increaseTime', [interval.add(1).toNumber()]);
                    await network.provider.send('evm_mine', []);

                    const { upkeepNeeded } = await raffle.callStatic.checkUpkeep([]);

                    assert(!upkeepNeeded);
                });

                it('Returns false if raffle is not open', async () => {
                    await raffle.enterRaffle({ value: raffleEntranceFee });
                    await network.provider.send('evm_increaseTime', [interval.add(1).toNumber()]);
                    await network.provider.send('evm_mine', []);
                    await raffle.performUpkeep('0x');

                    const raffleState = await raffle.getRaffleState();
                    const { upkeepNeeded } = await raffle.callStatic.checkUpkeep([]);

                    assert.equal(raffleState.toString(), '1');
                    assert(!upkeepNeeded);
                });

                it('returns false if enough time hasn\'t passed', async () => {
                    await raffle.enterRaffle({ value: raffleEntranceFee });
                    await network.provider.send('evm_increaseTime', [interval.toNumber() - 5]);
                    await network.provider.request({ method: 'evm_mine', params: [] });

                    const { upkeepNeeded } = await raffle.callStatic.checkUpkeep('0x');

                    assert(!upkeepNeeded);
                });

                it('returns true if enough time has passed, has players, eth, and is open', async () => {
                    await raffle.enterRaffle({ value: raffleEntranceFee });
                    await network.provider.send('evm_increaseTime', [interval.toNumber() + 1]);
                    await network.provider.request({ method: 'evm_mine', params: [] });

                    const { upkeepNeeded } = await raffle.callStatic.checkUpkeep('0x');

                    assert(upkeepNeeded);
                });
            });

            describe('performUpKeep', () => {
                it('can run only when checkUpkeep returns true', async () => {
                    await raffle.enterRaffle({ value: raffleEntranceFee });
                    await network.provider.send('evm_increaseTime', [interval.add(1).toNumber()]);
                    await network.provider.send('evm_mine', []);

                    const tx = await raffle.performUpkeep([]);
                    assert(tx);
                });

                it('reverts if checkUpkeep returns false', async () => {
                    await expect(raffle.performUpkeep([])).to.be
                        .revertedWithCustomError(raffle, 'Raffle__UpkeepNotNeeded');
                });

                it('updates the raffle state, emits an event and calls the vrf coordinator', async () => {
                    await raffle.enterRaffle({ value: raffleEntranceFee });
                    await network.provider.send('evm_increaseTime', [interval.add(1).toNumber()]);
                    await network.provider.send('evm_mine', []);

                    const tx = await raffle.performUpkeep([]);
                    const txReceipt = await tx.wait(1);
                    const requestId = txReceipt.events?.[1]?.args?.requestId;
                    const raffleState = await raffle.getRaffleState();

                    assert(requestId.toNumber() > 0);
                    assert(raffleState.toString() === '1');
                });
            });

            describe('fulfillRandomWords', () => {
                beforeEach(async () => {
                    await raffle.enterRaffle({ value: raffleEntranceFee });
                    await network.provider.send('evm_increaseTime', [interval.add(1).toNumber()]);
                    await network.provider.send('evm_mine', []);
                });

                it('can only be called after performUpkeep', async () => {
                    await expect(vrfCoordinatorV2Mock.fulfillRandomWords(0, raffle.address)).to.be
                        .revertedWith('nonexistent request');
                    await expect(vrfCoordinatorV2Mock.fulfillRandomWords(1, raffle.address)).to.be
                        .revertedWith('nonexistent request');
                });

                it('picks a winner, resets the lottery and sends money', async () => {
                    const additionalEntrants = 3;
                    const startingAccountIndex = 1; // deployer account is 0;
                    const accounts = (await ethers.getSigners()).slice(
                        startingAccountIndex,
                        additionalEntrants + startingAccountIndex
                    );
                    const startingTimeStamp = await raffle.getLastTimeStamp();
                    const startingBalanceMap: Record<string, BigNumber> = {};

                    await Promise.all(accounts.map(async (account) => {
                        const accountConnectedRaffle = raffle.connect(account);
                        await accountConnectedRaffle.enterRaffle({ value: raffleEntranceFee });

                        startingBalanceMap[account.address] = await account.getBalance()
                    }))

                    await new Promise(async (resolve, reject) => {
                        raffle.once('WinnerPicked', async (event) => {
                            try {
                                const recentWinner = await raffle.getRecentWinner();
                                const winnerStartingBalance = startingBalanceMap[recentWinner];

                                const raffleState = await raffle.getRaffleState();
                                const endingTimeStamp = await raffle.getLastTimeStamp();
                                const numPlayers = await raffle.getNumberOfPlayers();

                                assert(numPlayers.toString(), '0');
                                assert(raffleState.toString(), '0');
                                assert(endingTimeStamp.toNumber() > startingTimeStamp.toNumber());

                                const winnerEndingBalance = await raffle.provider.getBalance(recentWinner);

                                assert.equal(
                                    winnerEndingBalance.toString(),
                                    winnerStartingBalance.add(
                                        raffleEntranceFee!.mul(additionalEntrants + 1)
                                    ).toString()
                                );

                                resolve(event);
                            } catch (e) {
                                reject(e);
                            }
                        });

                        const tx = await raffle.performUpkeep([]);
                        const txReceipt = await tx.wait(1);

                        await vrfCoordinatorV2Mock.fulfillRandomWords(
                            txReceipt.events?.[1]?.args?.requestId || 0,
                            raffle.address
                        );
                    });
                });
            });
        }
    );
