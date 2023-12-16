import { NextResponse } from "next/server"

export  async function POST(req: Request) {
  const request = await req.json()
  const {id,page} = request
  console.log(id,page)
  const respnse = await fetch(`http://localhost:4000/user/${id}/${page}`, {
    method: "GET",
    headers: {"Content-Type": "application/json"}})
    const resBody = await respnse.json()
    console.log(resBody)
  return NextResponse.json(resBody) }
