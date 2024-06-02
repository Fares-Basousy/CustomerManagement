'use client'
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Row from '../../../components/Row';
import { signOut } from 'next-auth/react';
export default function Dashboard({params}) {
  const { data: session, status } = useSession()
    const [customers,setCustomers]= useState([])
    const [refresh,setRefresh] = useState()
    const [showAdd,setShowAdd] = useState(false)
    const [showDel,setShowDel] = useState(false)
    const [rem,setRem] = useState('')
    const [query,setQuery] = useState('')
    const [err,setErr] = useState('')
    const [count,setCount] = useState(0)
    const [newCustomer,setNewCustomer] = useState(
    {name:'', gender:'', email:'', 
    phone:'',address:'', city:'' ,
    country:'',note:''})
    const router = useRouter()
      useEffect(()=>{
      const getCustomers = async()=>{
          const request = await fetch('/api/getcus',
          {method: "POST",
          headers: {"Content-Type": "application/json" },
          body:JSON.stringify({id:session?.user.id,page:Number.parseInt(params.page)})})
          const resBody = await request.json()
          setCustomers(resBody.customer)
          setCount(resBody.count)
        }
        if (status == "authenticated") {
          getCustomers()
        }
          },[status,refresh])
   
    const handleOperation= (event)=>{
      const {name, value} = event.target;
      setNewCustomer((prev)=>({
          ...prev,
        [name]: value
      }))
    }
    const editCustomer = async (editData)=>{
      const reqBody = editData
      reqBody.userId = session.user.id 
      await fetch('/api/editcus', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(reqBody),})
      .then(async (res)=>{
        const resBody =await res.json()
        if(resBody.statusCode == 403)
        {
          toast.error(resBody.message)
          setErr(resBody.message)
      }
      else{
        toast.success('Customer Modified')        
      }         
        setRefresh(Math.random())})
}
    const handleSignOut = (event) => {
      event.preventDefault()
      signOut({redirect: true, callbackUrl: "/"}); //need  to look into redirect
      };
    const handleSubmit = async(event)=>{
      event.preventDefault()
      const operation = event.target.attributes.name.value
      let reqBody
      switch (operation){
        case 'addCus':
          reqBody = newCustomer
          reqBody.userId = session.user.id 
          await fetch('/api/addcus', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(reqBody),})
          .then(async (res)=>{
            const resBody =await res.json()
            if(resBody.statusCode == 403)
            {
              toast.error(resBody.message)
              setErr(resBody.message)
          }
          else{
            toast.success('Customer Added')
            setRefresh(Math.random())
            setNewCustomer( {name:'', gender:'', email:'', 
            phone:'',address:'', city:'' ,
            country:'',note:''})
          }         
            setRefresh(Math.random())})
          break
        case 'del':
          reqBody = {id:rem,userId:session.user.id}  
          await fetch('/api/delcus', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(reqBody),})
          .then(async (res)=>{
            const resBody =await res.json()
            if(resBody.statusCode == 403)
            {
              toast.error(resBody.message)
              setErr(resBody.message)
          }
          else{
            toast.success('Customer Deleted')
            setRefresh(Math.random())
          }
        }
          )
          break
        case 'search':
          reqBody = {query:query, userId:session.user.id}  
          const res = await  fetch('/api/search', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(reqBody),})
          const resBody = await res.json()
          setCustomers([])
          setCustomers(resBody)
          

          break
      }
     
  

}
  return (<div>
  
    <title>Customer Managament</title>
<Toaster />  
       <nav className='top-0'> 

<div className="navbar bg-base-100 justify-between">
  <div>
    <div className="normal-case text-xl" href='/home'> <strong>{`Hello ${session?session.user.name:''}`}</strong></div>
  </div>
    
  <form id='search' onSubmit={handleSubmit} name='search' className='flex justify-evenly'>
      <input type="text" placeholder="Search Customer" value={query} onChange={(e)=>{setQuery(e.target.value)}}  className="input input-bordered w-full max-w-xs" />
      <button type='submit' className="btn btn-neutral mx-1">Search</button>
    </form>
  
    
  <a onClick={handleSignOut}  href="/" role="button" className="btn btn-ghost secondary"><strong>LOG OUT</strong></a>
</div>
</nav>    <div className="container mx-auto p-4">
            <h3 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Customer Managament</h3>

<div><div className='flex justify-evenly'>
<button onClick={()=>setShowAdd(true)} className="btn btn-success">Add Customer</button>
<button onClick={()=>setShowDel(true)} className="btn btn-error">Remove Customer</button></div>
  <table className=" table-fixed table mx-auto rounded-lg   border-separate border border-slate-500">
          <thead className='text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
      <tr>
        <th className='text-sm break-words'>Id</th>
        <th className='text-sm break-words'>Name</th>
        <th className='text-sm break-words'>Status</th>
        <th className='text-sm break-words'>Gender</th>
        <th className='text-sm break-words'>Email</th>
        <th className='text-sm break-words'>Phone</th>
        <th className='text-sm break-words'>Address</th>
        <th className='text-sm break-words'>City</th>
        <th className='text-sm break-words'>Country</th>
        <th className='text-sm break-words'>Note</th>
        <th className='text-sm break-words'>Confirm</th>     
      </tr>
    </thead>
    <tbody>         
      {customers.length>0?customers.map((customer, index) => (
              
               <Row key={`customer${index}`} rawData={customer} styles={index%2==0?'bg-white border-b dark:bg-gray-900 dark:border-gray-700':'border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700'} update={editCustomer} />)):
             <tr  className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
              <th className="font-bold !text-sm">    
                  Customer Id
              </th>
              <td className="font-bold text-left !text-sm break-words" >
                customer name
              </td>
              <td className="font-bold text-left !text-sm break-words" >
                customer status 
              </td>
              <td className="font-bold text-left !text-sm break-words" >
                customer gender 
              </td>
              <td className="font-bold text-left !text-sm break-words" >
                customer email
              </td>
              <td className="font-bold text-left !text-sm break-words" >
                customer phone
              </td>
              <td className="font-bold text-left !text-sm break-words" >
                customer address
              </td>
              <td className="font-bold text-left !text-sm break-words" >
                customer city
              </td>
              <td className="font-bold text-left !text-sm break-words" >
                customer country
              </td>
              <td className="font-bold text-left !text-sm break-words" >
                customer note
              </td>
              <td><button className="btn !btn-sm sm:btn-sm md:btn-md lg:btn-lg">Confirm</button></td>
            </tr>}
        </tbody>
          </table>
          <div className="join grid grid-cols-2">
            <button disabled={params.page==0?true:false} onClick={()=>router.push(`/dashboard/${Number.parseInt(params.page)-1}`)} className="join-item btn btn-outline">Previous page</button>
            <button disabled = {count>(Number.parseInt(params.page)+1)*10?false:true} onClick={()=>router.push(`/dashboard/${Number.parseInt(params.page)+1}`)} className="join-item btn btn-outline">Next page</button>
          </div>
          </div>  
      </div>
      
{showAdd ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="bg-gray-900 relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="bg-gray-900 border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-gray-200">
                    Add Customer
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 s float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {setShowAdd(false) ;setErr('')}}
                  >
                    <span className="bg-transparent text-white h-6 w-6 text-xl break-words block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                  <form className="bg-gray-900 relative p-6 flex-auto transition-all  shadow-md rounded px-8 pt-6 pb-8 mb-2  flex flex-col text-left " name='addCus' onSubmit={handleSubmit} id='addCus'>
                  <div className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <label className="form-control w-full max-w-xs">
                  <div className="label"><span className="label-text">Customer name *</span></div>
                  <input required type="text" name='name' value={newCustomer.name} onChange={handleOperation}  placeholder="John Bro" className="input input-bordered w-full max-w-xs" />
                </label> 
                <label className="form-control w-full max-w-xs">
                  <div className="label"><span className="label-text">Customer email * </span></div>
                  <input required type="text" name='email' value={newCustomer.email} onChange={handleOperation} placeholder="customer@procrew.com" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label"><span className="label-text">Customer phone *</span></div>
                  <input  type="text" placeholder="+xxxxx" name='phone' value={newCustomer.phone} onChange={handleOperation} className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label"><span className="label-text">Customer address </span></div>
                  <input type="text" placeholder="street" name='address' value={newCustomer.address} onChange={handleOperation} className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label"><span className="label-text">Customer city</span></div>
                  <input type="text" placeholder="Alexandria" name='city' value={newCustomer.city} onChange={handleOperation} className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label"><span className="label-text">Customer country</span></div>
                  <input type="text" placeholder="Egypt" name='country' value={newCustomer.country} onChange={handleOperation} className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label"><span className="label-text">Customer gender </span></div>
                  <input type="text" placeholder="Male, Female, etc" name='gender' value={newCustomer.gender} onChange={handleOperation} className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label"><span className="label-text">note </span></div>
                  <input type="text" placeholder="notes" name='note' value={newCustomer.note} onChange={handleOperation} className="input input-bordered w-full max-w-xs" />
                </label>
                     
                    </div>          
                  </form>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <p className="mb-4 font-extrabold leading-none tracking-tight text-red-600 text-center">{err}</p>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() =>{ setShowAdd(false);setErr('')}}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    form="addCus"
                  >
                    Add Customer
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

{showDel ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="bg-gray-900 relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="bg-gray-900 border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-gray-200">
                    Remove Customer
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 s float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() =>{ setShowDel(false);setErr('')}}
                  >
                    <span className="bg-transparent text-white h-6 w-6 text-xl break-words block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                  <form className="bg-gray-800 relative p-6 flex-auto transition-all  shadow-md rounded px-8 pt-6 pb-8 mb-2  flex flex-col text-left" id='del' name='del' onSubmit={handleSubmit} >
                  <div className=" bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <label className="form-control w-full max-w-xs">
                  <div className="label"><span className="label-text">Customer Id *</span></div>
                  <input required type="text" name='id' value={rem} onChange={(e)=>{setRem(e.target.value)}}  placeholder="Id" className="input input-bordered w-full max-w-xs" />
                </label>      
                    </div>          
                  </form>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <p className="mb-4  font-extrabold leading-none tracking-tight text-red-600   text-center "  >
                  {err}
                </p>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {setShowDel(false);setErr('')}
                    }
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    form="del"
                  >
                    Remove Customer
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
 </div>  
  )
        }

