// import data from "../fakeData";
import { useEffect, useState } from "react";
import TextType from "./MessageItem"
import { MessageType } from "@/utils/types";
import axiosClient from "@/lib/axiosClient";

const MessageBox = ({messages, current}) => {
    const [data,setData] = useState<MessageType[]>([])
    useEffect(()=>{
        setData(messages.map((message) => ({
            ava: "",
            name: getUserFullname(message.userId),
            time: message.createdAt,
            type: "text",
            content: message.content,
            reply: null,
            role: "guest",
            site: message.userId === current._id ? "me" : "other",
          })))
    },[messages])

    const getUserFullname = async (id:string) => {
        try {
            const user = await axiosClient.get(`/user/${id}`,{
                withCredentials: true
            })
            return user.username
        } catch (error) {
          console.log(error);
        };
    }
    return ( 
        <div className="p-5 h-[30rem] w-full overflow-y-auto bg-cover bg-no-repeat bg-[url('/images/chatBackground.png')]">
            {data.map((e, key)=>{
                switch(e.type){
                    case "link":
                        return <div key={key}></div>
                    case "image":
                        return <div key={key}></div>
                    default:
                        return <TextType params={e} key={key}/>
                }
            })}
        </div>
     );
}

// const data1 = [
//     {
//         ava: "",
//         name: "host A",
//         time: "12:12AM",
//         type: "text",
//         // content: "Hello everyone",
//         reply: null,
//         role: "host",
//         site: "other"
//     },
//     {
//         // ava: "/src/assets/cena.jpg",
//         name: "Guest A",
//         time: "12:12AM",
//         type: "text",
//         // content: "Hi host",
//         reply: null,
//         role: "guest",
//         site: "me"
//     },
//     {
//         // ava: "/src/assets/cary.jpg",
//         name: "guest B",
//         time: "12:12AM",
//         type: "text",
//         // content: "Hi host A",
//         reply: "Hello everyone",
//         role: "guest",
//         site: "other"
//     },
//     {
//         // ava: "/src/assets/cary.jpg",
//         name: "guest B",
//         time: "12:12AM",
//         type: "text",
//         // content: "Hi host A",
//         reply: "Hello everyone",
//         role: "guest",
//         site: "other"
//     },
//     {
//         // ava: "/src/assets/cary.jpg",
//         name: "guest B",
//         time: "12:12AM",
//         type: "text",
//         // content: "Hi host A",
//         reply: "Hello everyone",
//         role: "guest",
//         site: "other"
//     },
//     {
//         // ava: "/src/assets/cary.jpg",
//         name: "guest B",
//         time: "12:12AM",
//         type: "text",
//         // content: " worship a hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers. Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.",
//         reply: "Hello everyone",
//         role: "guest",
//         site: "other"
//     },
//     {
//         // ava: "/src/assets/cena.jpg",
//         name: "Guest A",
//         time: "12:12AM",
//         type: "text",
//         // content: "Hi host",
//         reply: null,
//         role: "guest",
//         site: "me"
//     },
//     {
//         // ava: "/src/assets/cena.jpg",
//         name: "Guest A",
//         time: "12:12AM",
//         type: "text",
//         // content: "Hi host",
//         reply: null,
//         role: "guest",
//         site: "me"
//     },
// ]
 
export default MessageBox;