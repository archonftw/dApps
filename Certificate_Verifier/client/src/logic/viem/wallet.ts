import { createWalletClient,http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import { abi } from "../Contract/abi.ts";
import { getContract } from "viem";

const account = privateKeyToAccount(
    import.meta.env.VITE_PRIVATE_KEY as `0x${string}`
)

export const walletClient = createWalletClient({
    account,
    chain:sepolia,
    transport:http(import.meta.env.VITE_RPC_URL)
})


export const writeContract = getContract({
    address:import.meta.env.VITE_CONTRACT_ADDRESS,
    abi,
    client:walletClient  
})