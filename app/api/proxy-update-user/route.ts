import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const apiRes = await fetch("http://20.198.216.187:5000/api/Register/UpdateUser", {
      method: "PUT",
      headers: {
        "ApiKey": "xscklfkvkdcnkvx",
        "accept": "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    const data = await apiRes.json()
    return NextResponse.json(data, { status: apiRes.status })
  } catch (error) {
    return NextResponse.json({ error: "Proxy update failed" }, { status: 500 })
  }
}
