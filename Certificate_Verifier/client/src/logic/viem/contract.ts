import { getContract } from "viem";
import { publicClient } from "./client.ts";
import { abi } from "../Contract/abi.ts";
import { walletClient } from "./wallet.ts";

export const Contract = getContract({
    abi,
    address:import.meta.env.VITE_CONTRACT_ADDRESS,
    client:{
        public:publicClient,
        wallet:walletClient
    }
})