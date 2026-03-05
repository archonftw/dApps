import { jsPDF } from "jspdf"
import { publicClient } from "./viem/client"
import { hexToBytes } from "viem"   
import { readContract } from "./viem/client"
import { writeContract } from "./viem/wallet"

interface FormData {
  studentName: string
  course: string
}

export async function generatePDF(data: FormData) {
  const doc = new jsPDF()

  doc.setFontSize(18)
  doc.text("Student Certificate", 20, 20)

  doc.setFontSize(12)
  doc.text(`Student Name: ${data.studentName}`, 20, 40)
  doc.text(`Course: ${data.course}`, 20, 50)

  // Convert PDF → ArrayBuffer
  const pdfBuffer = doc.output("arraybuffer")

  // Generate SHA256 hash
  const hashHex = await sha256(pdfBuffer)

  // Convert to Solidity bytes32 format
  const hash = `0x${hashHex}` as `0x${string}`

  console.log("Certificate Hash:", hash)

  // Send to blockchain
  await issueCert(hash, data.studentName, data.course)

  // Save certificate locally
  doc.save("certificate.pdf")

  return hash
}

async function sha256(buffer: ArrayBuffer): Promise<string> {
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer)

  const hashArray = Array.from(new Uint8Array(hashBuffer))

  const hashHex = hashArray
    .map(b => b.toString(16).padStart(2, "0"))
    .join("")

  return hashHex
}




async function issueCert(
  hash: `0x${string}`,
  name: string,
  course: string
) {
  const txHash = await writeContract.write.issueCertificate([
    hash as `0x${string}`,
    name,
    course
  ])

    await publicClient.waitForTransactionReceipt({ hash: txHash })

  console.log("Transaction Hash:", txHash)

await publicClient.waitForTransactionReceipt({
  hash: txHash
})

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

    return result   // ✅ IMPORTANT

  } catch (error) {

    console.log("Certificate NOT FOUND")

    throw error     // ✅ important for React catch block

  }
}