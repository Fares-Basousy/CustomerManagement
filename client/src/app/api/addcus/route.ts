import { NextResponse } from "next/server"

export  async function POST(req: Request) {
  const request = await req.json()
  console.log(request)
  const respnse = await fetch('http://localhost:4000/user/add', {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(request)})
    const resBody = await respnse.json()
  return NextResponse.json(resBody) }
