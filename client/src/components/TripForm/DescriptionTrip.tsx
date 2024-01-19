'use client';
import { useTripStore } from '@/lib/zustand';
import {Input, Button} from 'antd'
import { useState } from 'react';
const { TextArea } = Input;
const DescriptinTrip = ({nextStep,preStep}) => {
    const [description,setDescription] = useState("")
    const setDescriptionStore = useTripStore((state:any)=>state.setDescriptionTrip)
    function handleDescriptionValue(){
        if(!!description){
            setDescriptionStore(description)
            nextStep()
        }
        return
    }
    return ( 
        <div style={{height:"35rem"}}>
            <h1 className="text-3xl font-semibold mb-5">Tell me about your trip</h1>
            <p className="text-sm text-slate-400 mb-6">This is the option, the description will make visitor know detail where thay go</p>
            <TextArea rows={5} placeholder='Write your description here' value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <div className='flex gap-2 mt-6'>
                <Button onClick={handleDescriptionValue}>Next</Button>
                <Button onClick={preStep}>Prev</Button>
            </div>
        </div>
     );
}
 
export default DescriptinTrip;