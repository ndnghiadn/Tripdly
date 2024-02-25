'use client';
import axiosClient from '@/lib/axiosClient';
import { useTripStore } from '@/lib/zustand';
import { Trip } from '@/utils/types';
import { Col, InputNumber, Slider, Button } from 'antd';
import { useState } from 'react';

const MemberTrip = ({preStep}) => {
    const [members,setMembers] = useState(10);
    const setMembersStore = useTripStore((state:any)=>state.setMemberLimitTrip)
    function handleMemberValue(){
        if(!!members){
            setMembersStore(members)
        }
    }
    const tripForm = useTripStore((state:any)=>state.tripCreated)
    async function handleCompleteForm(){
        handleMemberValue()
        console.log("trip form : ",tripForm);
        
        const res = await axiosClient.post(
            "/trip",
            tripForm,
            {
                withCredentials: true,
            }
        )
        console.log(res.data);
        
    }


    const onChange = (newValue: number) => {
        setMembers(newValue);
        }
    return ( 
        <div style={{height:"35rem"}}>
            <h1 className="text-3xl font-semibold mb-5">May be you wanna limit members of the trip</h1>
            <p className="text-sm text-slate-400 mb-6">This is the option, make your trip is more management. The limit will be 10 member</p>
            <div className='flex gap-6'>
                <Slider
                    style={{flex:"1 0 auto"}}
                    min={1}
                    max={10}
                    onChange={onChange}
                    value={typeof members === 'number' ? members : 10}
                    />
                <p>{members} members</p>
            </div>
            <div className='flex gap-2 mt-6'>
                <Button onClick={handleCompleteForm}>Finish</Button>
                <Button onClick={preStep}>Prev</Button>
            </div>
        </div>
     );
}
 
export default MemberTrip;