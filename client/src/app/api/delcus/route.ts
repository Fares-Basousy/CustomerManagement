import { NextResponse } from "next/server"

export  async function POST(req: Request) {
  const request = await req.json()
  const {userId,id} = request
  const respnse = await fetch(`http://localhost:4000/user/${userId}/${id}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(request),})
    const resBody = await respnse.json()
    console.log(resBody)
  return NextResponse.json(resBody) }
