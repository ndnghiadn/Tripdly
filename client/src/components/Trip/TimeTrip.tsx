'use client';
import { useTripStore } from '@/lib/zustand';
import { Button } from 'antd';
import { useState } from 'react';
import type {Dayjs} from 'dayjs'
import Calendar from '../ui/calendar';
const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

const TimeTrip = ({nextStep,preStep}) => {
    const [times,setTimes] = useState(
        {
            date: "Moday",
            from: "7AM",
            to: "8AM"
        }
    );
    const setTimeStore = useTripStore((state:any)=>state.setTimeTrip)
    function handleTimeValue(){
        if(!!times){
            setTimeStore(times)
            nextStep()
        }
    }
    return ( 
        <div style={{height:"35rem"}}>
            <h1 className="text-3xl font-semibold mb-5">What time you will available ?</h1>
            <p className="text-sm text-slate-400 mb-6">Set up your available time for visitor can contact to you</p>
            <Calendar/>
            <div className='flex gap-2 mt-6'>
                <Button onClick={handleTimeValue}>Next</Button>
                <Button onClick={preStep}>Prev</Button>
            </div>
        </div>
     );
}
 
export default TimeTrip;