import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const apiRes = await fetch("http://20.198.216.187:5000/api/Users", {
      headers: {
        "ApiKey": "xscklfkvkdcnkvx",
        "accept": "*/*",
      },
      // @ts-ignore
      cache: "no-store",
    })
    const data = await apiRes.json()
    return NextResponse.json(data, { status: apiRes.status })
  } catch (error) {
    return NextResponse.json({ error: "Proxy fetch failed" }, { status: 500 })
  }
}
