import { NextResponse } from "next/server"


export  async function POST(req: Request) {
  const request = await req.json()
  const {page,userId,query} = request
  const respnse = await fetch(`http://localhost:4000/user/search/${page}/${userId}/${query}`, {
    method: "GET",
    headers: {"Content-Type": "application/json",}
})
    const resBody = await respnse.json()
  return NextResponse.json(resBody) }