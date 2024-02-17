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
    function convertToFormData(data){
        const form:any = new FormData()
        // form.append('title',data.title)
        // form.append("description",data.description)
        // form.append('memberLimit',data.memberLimit.toString())
        for(let i = 0;i<data.locations.length;i++)
            form.append('address',data.locations[i].address[i])
        for(let i = 0;i<data.locations.length;i++)
            for(let j = 0;j<data.locations[i].images.length;j++)
                form.append('images',data.locations[i].images[j])
        // form.append('time',data.time)
        return form
        
    }
    const tripForm = useTripStore((state:any)=>state.tripCreated)
    async function handleCompleteForm(){
        handleMemberValue()
        console.log("trip form : ",tripForm);
        const tripConvert = convertToFormData(tripForm)
        console.log(tripConvert);
        
        const res = await axiosClient.post(
            "/trip",
            tripConvert,
            {
                withCredentials: true,
                headers: {'Content-type':'multipart/form-data'}
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