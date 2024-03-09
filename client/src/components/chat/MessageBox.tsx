// import data from "../fakeData";
import { useEffect, useState } from "react";
import TextType from "./MessageItem"
import { MessageType } from "@/utils/types";
import axiosClient from "@/lib/axiosClient";
import chatBackground from "../../../public/images/chatBackground.png" 

const MessageBox = ({messages, current}) => {
    const [data,setData] = useState<MessageType[]>([])
    const [loading,setLoading] = useState<boolean>(false)
    const [users,setUsers] = useState()
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

    const getUserFullname = async (id) => {
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
        <div className="p-5 h-[30rem] w-[30rem] overflow-y-auto bg-[url(images/chatBackground.png')]">
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