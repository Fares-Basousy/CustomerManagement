"use client"
import React, {  useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
export default function Register() {
    const [err,setErr] = useState('')
    const router = useRouter()
    const {register,handleSubmit} = useForm()
   
    const submit = async (data)=>{
        await fetch('/api/register', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),})
         .then(async (res)=>{
           const response = await res.json()
           if(response.statusCode == 403){
            setErr(response.message)}
           else{
            const login = {name:data.email, password:data.password}
            signIn("credentials",login)
                       }            
         })
 .catch((error)=>{
            console.log(error)
           setErr(error.message)
        })
    }
  return (   
<div className="hero min-h-screen bg-base-200">
<title>Register</title>
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Registeration</h1>
      <p className="py-6">{err}</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleSubmit(submit)}>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input type="text" placeholder="Joe Doe"  {...register("name")} className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input {...register("email")} type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password"  {...register("password")}className="input input-bordered" required />
          <label className="label">
            <a href="/signin" className="label-text-alt link link-hover">Already have an account?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Create Account</button>
        </div>
      </form>
    </div>
  </div>
</div>

)}