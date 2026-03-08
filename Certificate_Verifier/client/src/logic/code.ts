import { publicClient } from "./viem/client"
import { readContract } from "./viem/client"
import { writeContract } from "./viem/wallet"

interface FormData {
  studentName: string
  course: string
}


export async function issueCert(
  hash: `0x${string}`,
  name: string,
  course: string
) {
  const txHash = await writeContract.write.issueCertificate([
    hash as `0x${string}`,
    name,
    course
  ])

  // ✅ FIX 1: removed duplicate waitForTransactionReceipt
  await publicClient.waitForTransactionReceipt({ hash: txHash })
  console.log("Transaction Hash:", txHash)
  console.log("Certificate Issued")
}

export async function verifyCert(hash: `0x${string}`) {
  try {
    console.log("VERIFY HASH:", hash)
    const result = await readContract.read.verifyCertificate([hash])
    console.log("Certificate Verified")
    console.log("Student:", result[0])
    console.log("Course:", result[1])
    console.log("Issued At:", result[2])
    console.log("Issuer:", result[3])
    return result
  } catch (error) {
    console.log("Certificate NOT FOUND")
    throw error
  }
}