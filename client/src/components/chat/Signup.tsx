import axios from 'axios';
import React, { useState } from 'react'
import { Calendar } from 'primereact/calendar';
export default function Signup({setSignup}) {
    const [alert,setAlert] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [confirm,setConfirm] = useState('');
    const [fullname,setFullname] = useState('');
    const [dob,setDob] = useState('');
    const [address,setAddress] = useState('');
    const [email,setEmail] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    function signup(e){
      e.preventDefault()
      if(username==""|| password==""|| fullname==""|| dob==""|| address==""|| email==""|| phoneNumber==""|| confirm==""){
        return setAlert("Inputs are not filled")
      }
      else if(password!==confirm){
        return setAlert("Reconfirm your password")
      }
      axios
        .post("http://localhost:8888/sign-up", {
          username,password,fullname,dob,address,email,phoneNumber,role:"Visitor"
        })
        .then((response) => {
          return setAlert(response.data.message);
        })
        .catch(error => {
          console.log(error)
        });      
      }
  return (
    <div className='sm:w-3/5 lg:w-1/3 h-auto bg-white rounded-xl border-2'>
      <button className='pi pi-angle-left p-2 mt-2 ' onClick={()=>setSignup(true)}></button>
      <p className='flex justify-center text-4xl items-center text-cyan-900 font-semibold'>Tripdly</p>
      <p className='text-center p-2 text-sm'>Sign up</p>

      <form className='flex flex-col justify-center mb-5'>
        <input type='text' className='p-2 border-2 mt-2 mb-2 ml-5 mr-5 shadow-sm rounded-xl' placeholder='Username' onChange={(e)=>setUsername(e.target.value)} ></input>
        <input type='password' className='p-2 border-2 mt-2 mb-2 ml-5 mr-5 rounded-xl' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} ></input>
        <input type='password' className='p-2 border-2 mt-2 mb-2 ml-5 mr-5 shadow-sm rounded-xl' placeholder='Confirm password' onChange={(e)=>setConfirm(e.target.value)} ></input>
        {/* <input type='text' className='p-2 border-2 mt-2 mb-2 ml-5 mr-5 rounded-xl' placeholder='Fullname' onChange={(e)=>setFullname(e.target.value)} ></input> */}
        <Calendar placeholder='DOB' className='p-2 border-2 mt-2 mb-2 ml-5 mr-5 rounded-xl' value={dob} onChange={(e) => {setDob(e.value)}} />

        {/* <input type='text' className='p-2 border-2 mt-2 mb-2 ml-5 mr-5 rounded-xl' placeholder='Address' onChange={(e)=>setAddress(e.target.value)} ></input> */}
        <input type='email' className='p-2 border-2 mt-2 mb-2 ml-5 mr-5 rounded-xl' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} ></input>
        <input type='tel' className='p-2 border-2 mt-2 mb-2 ml-5 mr-5 rounded-xl' placeholder='Phone number' onChange={(e)=>setPhoneNumber(e.target.value)} ></input>
        {alert ?
          <p className='flex flex-row-reverse mr-7 text-sm font-medium text-red-600'>{alert}</p>
        :
          <></>}
        <button onClick={(signup)}className='p-2 bg-[#2EBBF5] text-white border-2 mt-2 mb-2  ml-5 mr-5 rounded-xl
         hover:bg-cyan-600 active:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-300'>
          Sign up</button>
      </form> 
    </div>  
    )
}
