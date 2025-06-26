import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const apiRes = await fetch("http://20.198.216.187:5000/api/Users", {
      headers: {
        "ApiKey": "xscklfkvkdcnkvx",
        "accept": "*/*",
      },
    })
    const data = await apiRes.json()
    res.status(apiRes.status).json(data)
  } catch (error) {
    res.status(500).json({ error: "Proxy fetch failed" })
  }
}
