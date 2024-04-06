import { Avatar } from "@mui/material";
import {BiTime} from "react-icons/bi"
import {CiLocationOn} from "react-icons/ci"
import {HiOutlineUserGroup} from "react-icons/hi"
import {GrFormNext} from 'react-icons/gr'
import { useState } from "react";
const InforTrip = ({func, trip, members}:{func:(isTrip:boolean)=>void, trip: any, members:any}) => {
    console.log(trip);
    return ( 
        <div className="relative w-full h-full flex sm:text-xs lg:text-base flex-col items-center gap-5 bg-white shadow-lg rounded-xl md:p-2  lg:p-6 xl:p-10">
            <Avatar alt="Remy Sharp" sx={{ width: 56, height: 56 }} src="/static/images/avatar/1.jpg" />
            <p className="text-lg font-semibold text-[#6683C2]">{trip?.title}</p>
            <button title="ok" className="absolute right-4 bottom-3 flex" onClick={()=>func(false)}>
                <GrFormNext className="w-7 h-7 animate-moving-right"></GrFormNext>
            </button>
            <div className="bg-white rounded-md px-2 py-2 flex-1 w-full">
                <div className="flex justify-around">
                    <div className="flex items-center gap-3 px-1 py-1">
                        <BiTime className="w-5 h-5"/>
                        <div>
                            <h3 className="font-medium   text-[#6683C2]">Start time</h3>
                            <p className="  text-[#75def9]">12AM</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 px-1 py-1">
                        <BiTime className="w-5 h-5"/>
                        <div>
                            <h3 className="font-medium  text-[#6683C2]">Start time</h3>
                            <p className="  text-[#75def9]">12AM</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-1 py-1 justify-center">
                    <CiLocationOn className="w-6 h-6"/>
                    <div>
                        <h3 className="font-medium   text-[#6683C2]">Visting places</h3>
                        
                        <p className="  text-[#75def9]">
                        {
                            trip?.locations.map((location) =>{
                                    {console.log(location.name)}{location.name}
                                }
                            )
                        }</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-1 py-1 justify-center">
                    <HiOutlineUserGroup className="w-5 h-5"/>
                    <div>
                        <h3 className="font-medium text-[#6683C2]">Members</h3>
                        <p className="  text-[#75def9]">Current {members} - Limit {trip?.memberLimit}</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default InforTrip;