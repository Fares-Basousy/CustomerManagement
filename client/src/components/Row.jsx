import React, { useState, useEffect } from 'react';

export default function Row({ rawData,update,styles }) {
 const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    gender: false,
    phone: false,
    address: false,
    city: false,
    country: false,
    note: false,
 });

 const [customer, setCustomer] = useState({});
 useEffect(()=>{
  setCustomer(rawData)
 },[rawData])

 const handleDoubleClick = (property) => {
    setIsEditing({ ...isEditing, [property]: true });
 };

 const handleChange = (event) => {
  const {name, value} = event.target;
  setCustomer((prev)=>({
      ...prev,
    [name]: value
  }))
    setIsEditing({ ...isEditing, confirm: true });
 };

 const handleBlur = (property) => {
    setIsEditing({ ...isEditing, [property]: false });
 };
const confirm = ()=>{
  setIsEditing({ ...isEditing, confirm: false });
    update(customer);
}
 return ( 
  <tr key={customer?.id} className={styles}>
  <th className="font-bold text-left !text-sm break-words">{customer?.id}</th>
{isEditing.name ? <input
  className="font-bold text-left !text-sm break-words"
  type="text"
  value={customer?.name}
  name =  'name'
  onChange={handleChange}
  onBlur={() => handleBlur('name')}
/>:
<td className="font-bold text-left !text-sm break-words" onDoubleClick={() => handleDoubleClick('name')} >{customer?.name}</td>}

             
{isEditing.status ? <input
  className="font-bold text-left !text-sm break-words"
  type="text"
  value={customer?.status}
  name =  'status'
  onChange={handleChange}
  onBlur={() => handleBlur('status')}
/>:
<td className="font-bold text-left !text-sm break-words" onDoubleClick={() => handleDoubleClick('status')} >{customer?.status}</td>}

             
{isEditing.gender ? <input
  className="font-bold text-left !text-sm break-words"
  type="text"
  value={customer?.gender}
  name = 'gender'
  onChange={handleChange}
  onBlur={() => handleBlur('gender')}
/>:
<td className="font-bold text-left !text-sm break-words" onDoubleClick={() => handleDoubleClick('gender')} >{customer?.gender}</td>}

             
{isEditing.email ? <input
  className="font-bold text-left !text-sm break-words"
  type="text"
  value={customer?.email}
  name =  'email'
  onChange={handleChange}
  onBlur={() => handleBlur('email')}
/>:
<td className="font-bold text-left !text-sm break-words" onDoubleClick={() => handleDoubleClick('email')} >{customer?.email}</td>}

             
{isEditing.phone ? <input
  className="font-bold text-left !text-sm break-words"
  type="text"
  value={customer?.phone}
  name =  'phone'
  onChange={handleChange}
  onBlur={() => handleBlur('phone')}
/>:
<td className="font-bold text-left !text-sm break-words" onDoubleClick={() => handleDoubleClick('phone')} >{customer?.phone}</td>}



           
{isEditing.address ? <input
  className="font-bold text-left !text-sm break-words"
  type="text"
  value={customer?.address}
  name =  'address'
  onChange={handleChange}
  onBlur={() => handleBlur('address')}
/>:
<td className="font-bold text-left !text-sm break-words" onDoubleClick={() => handleDoubleClick('address')} >{customer?.address}</td>}

           
{isEditing.city ? <input
  className="font-bold text-left !text-sm break-words"
  type="text"
  value={customer?.city}
  name =  'city'
  onChange={handleChange}
  onBlur={() => handleBlur('city')}
/>:
<td className="font-bold text-left !text-sm break-words" onDoubleClick={() => handleDoubleClick('city')} >{customer?.city}</td>}


           
{isEditing.country ? <input
  className="font-bold text-left !text-sm break-words"
  type="text"
  value={customer?.country}
  name =  'country'
  onChange={handleChange}
  onBlur={() => handleBlur('country')}
/>:
<td className="font-bold text-left !text-sm break-words" onDoubleClick={() => handleDoubleClick('country')} >{customer?.country}</td>}

           
{isEditing.note ? <input
  className="font-bold text-left !text-sm break-words"
  type="text"
  value={customer?.note}
  name =  'note'
  onChange={handleChange}
  onBlur={() => handleBlur('note')}
/>:
<td className="font-bold text-left !text-sm break-words" onDoubleClick={() => handleDoubleClick('note')} >{customer?.note}</td>}
<td><button onClick={confirm} className="btn !btn-sm sm:btn-sm md:btn-md lg:btn-lg">Confirm</button></td>


     
      </tr>
 );
}


             
        
         