import { createPublicClient, http } from "viem"
import { sepolia } from 'viem/chains';
import { abi } from "../Contract/abi.ts";
import { getContract } from "viem";

export const publicClient = createPublicClient({
    chain:sepolia,
    transport:http(import.meta.env.VITE_RPC_URL)
})

export const readContract = getContract({
    address:import.meta.env.VITE_CONTRACT_ADDRESS,
    abi,
    client:publicClient
})