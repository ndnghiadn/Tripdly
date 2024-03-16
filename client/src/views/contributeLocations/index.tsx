'use client'
import axiosClient from "@/lib/axiosClient";
import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
// import "./index.css"

export const ContributeLocation= ()=> {
    const [addressLocation,setAddressLocation] = useState("")
    const [description,setDescription] = useState("")
    const [validAddress,setValidAddress] = useState(true)
    const [validImgs,setValidImgs] = useState(true)
    const [imgs,setImgs] = useState<File[]>([])
    function handleDescriptionChange(value:string){
        setDescription(value)
    }
    function handleAddLocationImg(e){
        setImgs([...imgs,e.target.files[0]])
    }
    function isValidAdress(){
        return !!addressLocation
    }
    function isValidationImgs(){
        return imgs.length > 0 ? true: false
    }
    async function handleCreateLocation(){
        const isValid = isValidAdress() && isValidationImgs()
        if(isValid){
            const form:any = new FormData()
            form.append('name',addressLocation)
            for(let i = 0;i<imgs.length;i++)
                form.append('images',imgs[i])
            const res = await axiosClient.post(
                '/locations',
                form,
                {
                    withCredentials: true,
                    headers: {'Content-type':'multipart/form-data'}
                }
            )
            console.log(res.data);
        }
        else{
            setValidAddress(isValidAdress())
            setValidImgs(isValidationImgs)
        }
    }
    
    return (
        <div className="container-contribute m-10 rounded-xl p-10 bg-slate-100">
            <div className="title-contribute">
                <h1 className="text-4xl font-semibold">Please contribute the locations you think is good for tripdly</h1>
            </div>
            <div className="main-contribute flex mt-10 gap-8">
                <div className="left-contribute grow-[1] flex flex-col gap-6">
                    <div className="flex flex-col gap-2 font-semibold">
                        <label htmlFor="name location">
                            Addres of location :
                        </label>
                        <Input className={!validAddress ? " border-red-200":""} value={addressLocation} onChange={(e)=>setAddressLocation(e.target.value)} placeholder='type address location'/>
                        {!validAddress && <p style={{ color: 'red', marginTop: '5px' }}>Name is required.</p>}
                    </div>
                    <div className="flex flex-col gap-2 font-semibold">
                        <label htmlFor="name location">
                            Description of location :
                        </label>
                        <TextArea
                            rows={5}
                            placeholder="Write your description here"
                            value={description}
                            onChange={e => handleDescriptionChange(e.target.value)}
                            // style={{ borderColor: error ? 'red' : null }}
                        />
                    </div>
                    <Button onClick={handleCreateLocation}>
                        Contribute
                    </Button>
                </div>
                <div className="right-contribute grow-[2] m-5 rounded-xl bg-slate-50 p-2 basis-40">
                    <div className="upload-btn-wrapper flex gap-3 flex-wrap">
                        {imgs?.length > 0 && imgs.map(curr=><img style={{width:"12.5rem", height:"9.5rem", borderRadius:"4px"}} key={curr} src={URL.createObjectURL(curr)} />)}
                        <div className="relative h-16 w-16 rounded-lg border-dotted border-2 border-slate-300 flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-slate-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <input onChange={handleAddLocationImg} type="file" name="myfile" id="myfile" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0"/>
                        </div>
                    </div>
                    {!validImgs && <p style={{ color: 'red', marginTop: '5px' }}>An images is required.</p>}
                </div>
            </div>
        </div>
    )
}