'use client';

import { useEffect, useState } from "react";
import {AutoComplete, TimePicker, Button, Input} from 'antd'
import { useTripStore } from "@/lib/zustand"
import axiosClient from "@/lib/axiosClient";

export interface locationType {
    name: string,
    imageUrls: string[]
}
export interface validationLocationType {
    isValidationAddress: boolean
}
const LocationTrip = ({nextStep,preStep}) => {
    const [locations, setLocations] = useState<locationType[]>([{
        name:"",
        imageUrls: []
    }])
    const [suggests,setSuggests] = useState<{ value: string }[]>([]);
    const [tempLocation,setTempLocation] = useState<locationType>()
    const [validationLocations,setValidationLocations] = useState<validationLocationType[]>([{
        isValidationAddress: true,
    }])
    const setLocationStore = useTripStore((state)=>state.setLocationTrip)
    function handleVerifyLocations(){
        // console.log(locations);
        const validation = isValidationLocations()
        console.log(validation);
        
        setValidationLocations(validation)
        const validAll = validation.reduce((res,curr)=>res && curr.isValidationAddress,true)
        if(validAll){
            setLocationStore(locations)
            nextStep()
        }
        return
    }
    // function setValidationDefault(){
    //     const temp = validationLocations.map(curr=>({
    //         isValidationAddress: true,
    //         isValidationImg: true
    //     }))
    //     setValidationLocations(temp)
    //     console.log(validationLocations);
        
    // }
    function isValidationLocations(){
        return locations.map(curr=>{
            let isValidationAddress = false
            if(!!curr.name)
                isValidationAddress = true
            return {isValidationAddress:isValidationAddress}
        })
    }
    async function handleChangeLocation(value:string,indexLocation:number){
        const tempLocation = [...locations]
        const result:any = await axiosClient(`/locations?address=${value}`,{withCredentials:true})
        tempLocation[indexLocation] = result[0]
        setLocations(tempLocation)
        // const result:any = await axiosClient(`/locations?address=${value}`,{withCredentials:true})
    }
    // function handleAddLocationImg(e, indexLocationBox:number) {
    //     const tempLocation = [...locations]
    //     tempLocation[indexLocationBox].images.push(e.target.files[0]);
    //     setLocations(tempLocation)
    // }
    // function handleRemoveLocationImg(indexLocationBox:number,indeximages:number){
    //     const tempLocation = [...locations]
    //     tempLocation[indexLocationBox].images.splice(indeximages,1)
    //     setLocations(tempLocation)
    // }
    function handleAddLocationAndValidation(){
        setLocations([...locations,{ name: "",imageUrls: [] }]);
        setValidationLocations(validationLocations=>([...validationLocations,{isValidationAddress:true}]))
    }
    async function handleSuggestLocation(value:string){
        let temp:{value:string,imageUrls:string[]}[] = []
        const result:any = await axiosClient(`/locations?address=${value}`,{withCredentials:true})
        if(result?.length) 
            temp = result.map(curr=>({"value":curr.name})) 
        setSuggests(temp)
    }
    return ( 
        <div className="h-[35rem]" style={{height:"35rem"}}>
            <h1 className="text-3xl font-semibold mb-5">Next step is where you wanna take tour</h1>
            <p className="text-sm text-slate-400 mb-6">Locations you will take visitors explore, but it have to be limited to three due to safety of users</p>
            <div className='flex flex-col items-start gap-4 w' style={{height:"20rem",overflow:"scroll"}} tabIndex={100} >
            {locations.map((curr, indexLocation) => (
                <div key={indexLocation} className="w-full">
                    <div className="location">
                        <div className="flex gap-3 items-center mb-1">
                            <h2>Location: </h2>
                            {/* <Input style={{width:"15rem"}} value={curr.address} onChange={(e)=>handleChangeLocation(e.target.value,indexLocation)}/> */}
                            <AutoComplete options={suggests} onSearch={(value)=>handleSuggestLocation(value)} onSelect={(value)=>handleChangeLocation(value,indexLocation)}  style={{ width: 200, borderRadius:"7px", borderColor: !validationLocations[indexLocation].isValidationAddress ? 'red': null }}/>
                        </div>
                        { !validationLocations[indexLocation].isValidationAddress && <p style={{ color: 'red', marginBottom: '10px' }}>You must type address !!!</p>}
                    </div>
                    <div className="images-box">
                        <div className="flex gap-2 items-center mb-1">
                            {curr.imageUrls.length > 0
                                && curr.imageUrls.map(
                                    (ele,indexLocationimages) => (
                                    <div key={indexLocationimages+"images"} className="relative">
                                        <img style={{width:"9rem", height:"6rem", borderRadius:"4px"}} src={ele} />
                                        {/* <svg onClick={()=>handleRemoveLocationImg(indexLocation,indexLocationimages)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{position:"absolute", width:"1.5rem",height:"1.5rem",top:"-0.5rem",right:"-0.5rem"}}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg> */}
                                    </div>))}
                            {/* {curr.images.length < 3 && <input type="file" onChange={(e)=>handleAddLocationImg(e,indexLocation)} />} */}
                        </div>
                        {/* {!validationLocations[indexLocation].isValidationImg && <p style={{ color: 'red', marginBottom: '10px' }}>Each address need at least a images !!!</p>}       */}
                    </div>
                </div>
            ))}
                <Button
                    style={{ display: 'flex', alignItems: "center", justifyContent:"center"}}
                    onClick={handleAddLocationAndValidation}
                    shape="circle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:"1rem",height:"1rem"}}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </Button>
            </div>
            <div className='flex gap-2 mt-6'>
                <Button onClick={handleVerifyLocations}>Next</Button>
                <Button onClick={preStep}>Prev</Button>
            </div>
        </div>
     );
}
 
export default LocationTrip;