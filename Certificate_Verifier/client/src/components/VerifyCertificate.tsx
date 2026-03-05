import { useState } from "react"
import { verifyCert } from "../logic/code.ts"

export default function VerifyCertificate() {

  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {

    const file = event.target.files?.[0]
    if (!file) return

    const buffer = await file.arrayBuffer()

    const hashHex = await sha256(buffer)

    const hash = `0x${hashHex}` as `0x${string}`

    try {

      const cert = await verifyCert(hash)

      setResult(cert)
      setError("")

    } catch {

      setResult(null)
      setError("Certificate not found")

    }
  }

  return (
    <div>

      <h2>Verify Certificate</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFile}
      />

      {result && (
        <div>
          <p>Student: {result[0]}</p>
          <p>Course: {result[1]}</p>
        </div>
      )}

      {error && <p>{error}</p>}

    </div>
  )
}

async function sha256(buffer: ArrayBuffer): Promise<string> {

  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer)

  const hashArray = Array.from(new Uint8Array(hashBuffer))

  return hashArray
    .map(b => b.toString(16).padStart(2, "0"))
    .join("")
}