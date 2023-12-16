import Image from 'next/image'
import { getServerSession } from 'next-auth';
import { authOptions } from './util/auth';
export default async function Home () {
  let session   
  await getServerSession(authOptions).then((res)=>{session=res;})
  
  return (
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-center text-neutral-content">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
        <p className="mb-5">Step into the heart of your customer relationships with our Customer Management Home Page. This digital haven is designed to simplify, organize, and elevate your interactions with clients, ensuring that every engagement is meaningful and every opportunity is seized.
        </p>
        <a href={session?'/dashbourd/0':'/signin'} className="btn btn-primary">Get Started</a>
      </div>
    </div>
  </div>
     )
}
