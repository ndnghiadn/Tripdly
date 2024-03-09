'use client';
import { useTripStore } from '@/lib/zustand';
import {Input, Button} from 'antd'
import { useState } from 'react';
const NameTrip = ({nextStep,preStep}) => {
    // data
    const [title,setTitle] = useState("")
    const [err,setErr] = useState(false)

    // method
    const setTitleStore = useTripStore((state:any)=>state.setTitleTrip) // set store
    function handleTitleValue(){ 
        if(!title){
            setErr(true)
        }
        else {
            setTitleStore(title)
            nextStep()
        }
    }
    return ( 
        <div style={{height:"35rem"}}>
            <h1 className="text-3xl font-semibold mb-5">Let start to name a trip</h1>
            <p className="text-sm text-slate-400 mb-6">This is the option, it's to make your trip feel cool</p>
            <Input placeholder='type your name trip' value={title} style={{ borderColor: err ? 'red' : null }} onChange={(e)=>setTitle(e.target.value)}/>
            <p className="text-sm text-slate-400 mb-6">Example: Da Nang - watching fired Drago bridge, chilling at river bank 😆</p>
            {err && <p className='text-red-400 mt-1'>This field is not blank</p>}
            <div className='flex gap-2 mt-6'>
                <Button onClick={handleTitleValue}>Next</Button>
                <Button onClick={preStep}>Prev</Button>
            </div>
        </div>
     );
}
 
export default NameTrip;