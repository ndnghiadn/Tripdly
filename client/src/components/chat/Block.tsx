import React, { useState } from 'react'
import axios from 'axios';
import Signup from './Signup';
import Login from './Login';
export default function Block() {
  const [signup,setSignup] = useState(true);
  return (
    signup?
    <Login setSignup={setSignup}/>
    :
    <Signup setSignup={setSignup}/>
  )
}
