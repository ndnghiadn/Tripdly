import axios from 'axios';
import React, { useState } from 'react'
// import { useAuthStore } from '../store/auth';
// import { useNavigate } from 'react-router-dom';
import UserInfo from './UserInfor';

export default function Login({setSignup}) {
//   const updateInfo = useAuthStore(state=>state.updateInfo)
//   let userInfo = useAuthStore(state=>state.userInfo)
//   const navigate = useNavigate()
  const [alert,setAlert] = useState('');
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  function login(e){
    e.preventDefault()
    if(username==""|| password==""){
      return setAlert("Inputs are not filled")
    }
    axios
      .post("http://localhost:8888/sign-in", {
        username,password
      },{
        withCredentials : true
      })
      .then((response) => {
        userInfo = response.data.data
        // updateInfo(userInfo,true);
      })
      .then(()=>{
        console.log(userInfo);
      
        // navigate(`/user/${userInfo._id}`)
      })
      .catch(error => {
        console.log(error)
     });
  }
  
  return (
    <div className='sm:w-3/4 lg:w-1/3 h-auto bg-white rounded-xl '>
      <p className='flex justify-center mt-5 text-4xl items-center text-cyan-900 font-semibold'>Tripdly</p>
      <p className='text-center p-2 text-sm'>Sign in to continue</p>
      <form className='flex flex-col justify-center'>
        <input type='text' className='p-2 border-2 mt-2 mb-2 ml-5 mr-5 shadow-sm rounded-xl' placeholder='Username' onChange={(e)=>setUsername(e.target.value)} ></input>
        <input type='password' className='p-2 border-2 mt-2 mb-2 ml-5 mr-5 rounded-xl' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} ></input>
        {alert ?
          <p className='flex flex-row-reverse mr-7 text-sm font-medium text-red-600'>{alert}</p>
        :
          <></>}
        <a href='#' className='text-sm text-[#2EBBF5] ml-5 hover:underline hover:underline-offset-2 md:underline-offset-4'>Forgot your password?</a>
        <button onClick={(login)} className='p-2 bg-[#2EBBF5] text-white border-2 mt-2 mb-2  ml-5 mr-5 rounded-xl hover:bg-cyan-600 active:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-300'>
          Log in</button>
      </form>

      <p className='text-center p-2 text-sm mb-4'>Don't have an account? 
        <button className='text-[#2EBBF5] ml-1 md:underline-offset-4 hover:underline hover:underline-offset-2' onClick={()=>setSignup(false)}>
          Sign up</button>
      </p>
    </div>  )
}
