"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserPage = ({ _id }) =>{
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        getUser()
      }, [])
    
    async function getUser() {
        try {
          await axios.get('http://localhost:9999/user',{ _id });
          setData(data)
          console.log("qwe",data)
          setLoading(false)
        } catch (error) {
          console.error(error);
        }
      }
    
  return (
    <div className="flex flex-col w-full h-fit bg-[#f5f5f5]">
        <div className='relative h-96 w-full flex flex-col items-center '>
            <div className='w-full h-1/3 bg-slate-600'></div>
            <div className='absolute w-full md:max-w-[850px]  xl:max-w-2/3 h-1/2 '>
                <div className='relative h-1/2'>
                    <div className='absolute flex md:justify-center md:items-center p-5 md:h-52 w-1/2 md:w-full '>
                        <img className='w-32 rounded-full' src='https://res.cloudinary.com/practicaldev/image/fetch/s--StOs_dXE--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1185053/655ef889-0262-417c-b1d6-d2e7e854ff93.png'/>
                    </div>
                </div>
                <div className='w-full h-1/2 flex flex-row-reverse items-center bg-white rounded-t-lg border-x-2 border-t-2 border-[#efefef]'>
                    {/* {userInfo._id == ownerInfo._id ?
                        <div>
                            <button className='px-5 py-1 rounded-full bg-blue-200 mr-4 font-medium'>Edit</button>
                        </div>
                    :
                        <></>
                    } */}
                </div>
            </div>
            <div className='absolute bottom-0 w-full md:max-w-[850px] xl:max-w-2/3  h-1/2 flex flex-col md:text-center bg-white rounded-b-lg mb-5 border-x-2 border-b-2 border-[#efefef]'>
                <h1 className='relative flex md:justify-center ml-5 md:ml-0 font-bold text-xl md:text-xl lg:text-2xl'>
                    {/* {userInfo.fullname} */}
                    </h1>
                <h1 className='relative flex justify-normal md:justify-center mt-2 md:mt-3 ml-5 md:ml-36 md:mr-36 text-sm md:text-base lg:text-lg'>
                    {/* {userInfo.description} */}
                </h1>
                <div className='relative mt-7 mb-3 flex md:justify-center gap-4'>
                    <div className='ml-5 md:ml-0 flex flex-row gap-2'>
                        <p className='pi pi-map-marker text-sm md:text-base'></p>
                        <h1 className='text-sm md:text-base'>Da Nang</h1>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <p className='pi pi-at text-sm md:text-base'></p>
                        <h1 className='text-sm md:text-base'>Joined on 
                        {/* {userInfo.createdAt.slice(0,10)} */}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full flex flex-col items-center'>
            <div className='w-full md:max-w-[850px] xl:max-w-2/3 h-full flex flex-col md:flex-row gap-3 mb-5'>
                <div className='w-full md:w-1/3 flex flex-col gap-3 h-full '>
                    <div className='w-full h-60 bg-white border-2 border-[#efefef] rounded-lg flex flex-col justify-center'>
                        Video intro
                    </div>
                    <div className='w-full h-fit bg-white border-2 border-[#efefef] rounded-lg flex flex-col justify-center text-sm md:text-base'>
                        <div className='p-3 items-center'>
                            <p className='pi pi-language mr-2 '/>
                            English, Vietnamese
                        </div>
                        <div className='p-3 items-center'>
                            <p className='pi pi-mobile mr-2'/>
                            {/* {userInfo.phoneNumber}   */}
                        </div>
                        <div className='p-3 items-center'>
                            <p className='pi pi-star mr-2'/>
                            3 trips created
                        </div>
                        <div className='p-3 items-center'>
                            <p className='pi pi-users mr-2'/>
                            12 people joined
                        </div>
                        <div className='p-3 items-center'>
                            <p className='pi pi-thumbs-up mr-2'/>
                            10 ratings
                        </div>
                        <div className='p-3 items-center'>
                            <p className='pi pi-comments mr-2'/>
                            10 rated posts
                        </div>
                    </div>  
                </div>
                <div className='w-full md:w-2/3 h-fit flex flex-col gap-3 '>
                    {/* <TripStory/>
                    <TripStory/>
                    <TripStory/>
                     */}
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default UserPage