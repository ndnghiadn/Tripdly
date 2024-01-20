'use client';

import { useState } from "react";
import {AutoComplete, TimePicker, Button, Input} from 'antd'
import { useTripStore } from "@/lib/zustand"

const LocationTrip = ({nextStep,preStep}) => {
    const [locations,setLocations] = useState(["652cb2f460a2bda501953cc8","65aa29dfa83742da8a17ca9c"])
    const setLocationStore = useTripStore((state)=>state.setLocationTrip)
    function handleLocationValue(){
        if(!!locations){
            setLocationStore(locations)
            nextStep()
        }
        return
    }
    const [locationBox, setLocationbox] = useState([{
        address: "Da nag",
        image: []
    }])
    function handleChange(e, indexLocationBox) {
        const tempLocation = [...locationBox]
        tempLocation[indexLocationBox].image.push(URL.createObjectURL(e.target.files[0]));
        setLocationbox(tempLocation)
    }
    function handleRemoveImage(indexLocationBox,indexImage){
        const tempLocation = [...locationBox]
        tempLocation[indexLocationBox].image.splice(indexImage,1)
        setLocationbox(tempLocation)
    }
    const getPanelValue = (searchText) =>
    !searchText ? [] : mockVal(searchText);
    const onSelect = (data) => {
        console.log('onSelect', data);
    };
    return ( 
        <div className="h-[35rem]" style={{height:"35rem"}}>
            <h1 className="text-3xl font-semibold mb-5">Next step is where you wanna take tour</h1>
            <p className="text-sm text-slate-400 mb-6">Locations you will take visitors explore, but it have to be limited to three due to safety of users</p>
            <div className='flex flex-col items-start gap-4 w' style={{height:"20rem",overflow:"scroll"}} >
            {locationBox.map((curr, indexLocationBox) => (
                <div key={indexLocationBox}>
                    <div className="flex gap-3 items-center">
                        <h2>Location: </h2>
                        <Input style={{width:"15rem"}}/>
                    </div>
                    <hr className="mt-2 mb-2"/>
                    <div className="flex gap-2 items-center">
                        {curr.image.length 
                            && curr.image.map(
                                (ele,indexImage) => (
                                <div key={indexImage+"image"} className="relative">
                                    <img style={{width:"9rem", height:"6rem", borderRadius:"4px"}} src={ele} />
                                    <svg onClick={()=>handleRemoveImage(indexLocationBox,indexImage)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{position:"absolute", width:"1.5rem",height:"1.5rem",top:"-0.5rem",right:"-0.5rem"}}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>))}
                        {curr.image.length < 3 && <input type="file" onChange={(e)=>handleChange(e,indexLocationBox)} />}      
                    </div>
                </div>
            ))}
                <Button
                    style={{ display: 'flex', alignItems: "center", justifyContent:"center"}}
                    onClick={
                    ()=> setLocationbox([...locationBox,{ address: "",image: [] }])
                    }
                    shape="circle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:"1rem",height:"1rem"}}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </Button>
            </div>
            <div className='flex gap-2 mt-6'>
                <Button onClick={handleLocationValue}>Next</Button>
                <Button onClick={preStep}>Prev</Button>
            </div>
        </div>
     );
}
 
export default LocationTrip;