'use client'
import React,{useState}from "react"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
export default function SignIn(){
    const router = useRouter()
    const [err,setErr] = useState()
    const {register,handleSubmit} = useForm()
    const { data, status } = useSession()
    console.log(data)
    console.log(status)
    if(status == 'authenticated')
      router.push('/dashboard/0')
    const submit = async (data)=>{
            try{
            const login = {email:data.email, password:data.password}
            signIn("credentials",login)
            } 
            catch(error){
            setErr(error.message)}
    }

return (
<div className="hero min-h-screen bg-base-200">
<title>SignIn</title>
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login</h1>
      <p className="py-6 text-red-600">{err}</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleSubmit(submit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email"   {...register("email")} className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password"  {...register("password")} className="input input-bordered" required />
          <label className="label">
            <a href="/register" className="label-text-alt link link-hover">Don't have an account?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>)}