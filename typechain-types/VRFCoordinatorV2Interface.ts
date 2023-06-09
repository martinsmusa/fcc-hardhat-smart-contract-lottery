/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface VRFCoordinatorV2InterfaceInterface extends utils.Interface {
  contractName: "VRFCoordinatorV2Interface";
  functions: {
    "acceptSubscriptionOwnerTransfer(uint64)": FunctionFragment;
    "addConsumer(uint64,address)": FunctionFragment;
    "cancelSubscription(uint64,address)": FunctionFragment;
    "createSubscription()": FunctionFragment;
    "getRequestConfig()": FunctionFragment;
    "getSubscription(uint64)": FunctionFragment;
    "pendingRequestExists(uint64)": FunctionFragment;
    "removeConsumer(uint64,address)": FunctionFragment;
    "requestRandomWords(bytes32,uint64,uint16,uint32,uint32)": FunctionFragment;
    "requestSubscriptionOwnerTransfer(uint64,address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "acceptSubscriptionOwnerTransfer",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "addConsumer",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelSubscription",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "createSubscription",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRequestConfig",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getSubscription",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "pendingRequestExists",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeConsumer",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "requestRandomWords",
    values: [BytesLike, BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "requestSubscriptionOwnerTransfer",
    values: [BigNumberish, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptSubscriptionOwnerTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addConsumer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cancelSubscription",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createSubscription",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRequestConfig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSubscription",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pendingRequestExists",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeConsumer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requestRandomWords",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requestSubscriptionOwnerTransfer",
    data: BytesLike
  ): Result;

  events: {};
}

export interface VRFCoordinatorV2Interface extends BaseContract {
  contractName: "VRFCoordinatorV2Interface";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VRFCoordinatorV2InterfaceInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    acceptSubscriptionOwnerTransfer(
      subId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addConsumer(
      subId: BigNumberish,
      consumer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    cancelSubscription(
      subId: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createSubscription(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getRequestConfig(
      overrides?: CallOverrides
    ): Promise<[number, number, string[]]>;

    getSubscription(
      subId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, string, string[]] & {
        balance: BigNumber;
        reqCount: BigNumber;
        owner: string;
        consumers: string[];
      }
    >;

    pendingRequestExists(
      subId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    removeConsumer(
      subId: BigNumberish,
      consumer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    requestRandomWords(
      keyHash: BytesLike,
      subId: BigNumberish,
      minimumRequestConfirmations: BigNumberish,
      callbackGasLimit: BigNumberish,
      numWords: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    requestSubscriptionOwnerTransfer(
      subId: BigNumberish,
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  acceptSubscriptionOwnerTransfer(
    subId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addConsumer(
    subId: BigNumberish,
    consumer: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  cancelSubscription(
    subId: BigNumberish,
    to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createSubscription(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getRequestConfig(
    overrides?: CallOverrides
  ): Promise<[number, number, string[]]>;

  getSubscription(
    subId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, string, string[]] & {
      balance: BigNumber;
      reqCount: BigNumber;
      owner: string;
      consumers: string[];
    }
  >;

  pendingRequestExists(
    subId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  removeConsumer(
    subId: BigNumberish,
    consumer: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  requestRandomWords(
    keyHash: BytesLike,
    subId: BigNumberish,
    minimumRequestConfirmations: BigNumberish,
    callbackGasLimit: BigNumberish,
    numWords: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  requestSubscriptionOwnerTransfer(
    subId: BigNumberish,
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    acceptSubscriptionOwnerTransfer(
      subId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    addConsumer(
      subId: BigNumberish,
      consumer: string,
      overrides?: CallOverrides
    ): Promise<void>;

    cancelSubscription(
      subId: BigNumberish,
      to: string,
      overrides?: CallOverrides
    ): Promise<void>;

    createSubscription(overrides?: CallOverrides): Promise<BigNumber>;

    getRequestConfig(
      overrides?: CallOverrides
    ): Promise<[number, number, string[]]>;

    getSubscription(
      subId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, string, string[]] & {
        balance: BigNumber;
        reqCount: BigNumber;
        owner: string;
        consumers: string[];
      }
    >;

    pendingRequestExists(
      subId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    removeConsumer(
      subId: BigNumberish,
      consumer: string,
      overrides?: CallOverrides
    ): Promise<void>;

    requestRandomWords(
      keyHash: BytesLike,
      subId: BigNumberish,
      minimumRequestConfirmations: BigNumberish,
      callbackGasLimit: BigNumberish,
      numWords: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    requestSubscriptionOwnerTransfer(
      subId: BigNumberish,
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    acceptSubscriptionOwnerTransfer(
      subId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addConsumer(
      subId: BigNumberish,
      consumer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    cancelSubscription(
      subId: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createSubscription(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getRequestConfig(overrides?: CallOverrides): Promise<BigNumber>;

    getSubscription(
      subId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingRequestExists(
      subId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeConsumer(
      subId: BigNumberish,
      consumer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    requestRandomWords(
      keyHash: BytesLike,
      subId: BigNumberish,
      minimumRequestConfirmations: BigNumberish,
      callbackGasLimit: BigNumberish,
      numWords: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    requestSubscriptionOwnerTransfer(
      subId: BigNumberish,
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptSubscriptionOwnerTransfer(
      subId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addConsumer(
      subId: BigNumberish,
      consumer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    cancelSubscription(
      subId: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createSubscription(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getRequestConfig(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getSubscription(
      subId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pendingRequestExists(
      subId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeConsumer(
      subId: BigNumberish,
      consumer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    requestRandomWords(
      keyHash: BytesLike,
      subId: BigNumberish,
      minimumRequestConfirmations: BigNumberish,
      callbackGasLimit: BigNumberish,
      numWords: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    requestSubscriptionOwnerTransfer(
      subId: BigNumberish,
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
