import { NextResponse } from "next/server"

export  async function POST(req: Request) {
  const request = await req.json()
  const respnse = await fetch('http://localhost:4000/auth/signup', {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(request),})
    const res = await respnse.json()


  return NextResponse.json(res) }