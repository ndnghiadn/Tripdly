"use client";
import { useUserStore } from "@/lib/zustand";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import MessageHeader from "./MessageHeader";
import MessageTool from "./MessageTool";
import InforTrip from "./InforTrip";
import UserInfo from "./UserInfor";
import Block from "./Block";
import { BlockUI } from 'primereact/blockui';

const ChatForm: React.FC<String> = ({ tripId }) => {
  const { current } = useUserStore();
  
  const socketRef = useRef<HTMLInputElement>(null);

  const isLogin = true;
  const [isTrip,setisTrip] = useState(true)
  const dummy = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const inputRef = useRef(null);
  

  const handleButtonClick = async () => {
    try {      
      // Send the message text
      await socketRef.current?.send(
        JSON.stringify({
          text: inputRef.current?.value.trim(),
        })
      );
      inputRef.current.value = '';      
    } catch (error) {
      console.error(error);
    }
  }


  const addMessage = (message:string) => {
    setMessages((prev) => [...prev, message]);
  };

  const addUser = (username:string) => {
    // console.log("user added", username);
    users.push(username);
  };

  const removeUser = (username:string) => {
    // console.log("user removed", username);
    setUsers((prevUsers) => prevUsers.filter(user => user !== username));
  };



  useEffect(() => {
    document.cookie = "tripId=" + tripId + "; path=/";

    if (!socketRef.current) {
      //Start a connection
      socketRef.current = new WebSocket('ws://localhost:8888/chat');

    }


    // Listen for messages
    socketRef.current?.addEventListener("message", (e) => {
      // Data sent will be a string so parse into an object
      const event = JSON.parse(e.data);
      console.log("event message", event);

      // Server sets a type for each message
      switch (event.type) {
        case "MESSAGES_ADD":
          console.log("message add",event)
          addMessage(event.data);
          break;
        case "MESSAGES_SET":          
          console.log("message set",event.data);
          setMessages(event.data);
          break;
        case "USERS_ADD":
          addUser(event.data);
          break;
        case "USERS_REMOVE":
          removeUser(event.data);
          break;
        case "USERS_SET":
          console.log("user set",event.data);
          setUsers(event.data);
          break;
      }
    });
  }, [tripId]);
  return (
    <>
      
      <div className="flex sm:px-2 h-full w-full">
      {/* <div className="bg-white h-full w-1/12">
        <SideBar/>
      </div> */}
      { current ?
          <div className="bg-[#F6F8FA] h-full w-full sm:w-4/5 sm:mr-3 flex flex-col rounded-xl">    
             <div className="flex-grow-0">
              <MessageHeader/>
            </div>
            <div className="flex-1 overflow-auto no-scrollbar" ref={dummy}>
              <MessageBox messages={messages} current={current}/>
            </div>
            <div className="flex-grow-0">
              <MessageTool inputRef={inputRef} handleButtonClick={handleButtonClick}/>
            </div>
          </div>
        : 
          <BlockUI template={<Block/>} containerClassName="h-full w-11/12 sm:w-4/5 sm:mr-3 flex flex-col rounded-xl " blocked={true}>
            <div className="blur-sm h-full w-full mr-3 flex flex-col rounded-xl">
              <div className="flex-grow-0">
                <MessageHeader/>
              </div>
              <div className="flex-1 overflow-auto no-scrollbar" ref={dummy}>
                <MessageBox messages={messages} current={current}/>
              </div>
              <div className="flex-grow-0">
                <MessageTool inputRef={inputRef} handleButtonClick={handleButtonClick}/>
              </div>
            </div>
          </BlockUI>
      }
      <div className="h-full sm:flex hidden flex-col sm:gap-1 md:gap-2 sm:w-1/4">
        <div className="flex-1 mb-4 sm:h-2/3">
          {isTrip ?
          (
            <InforTrip func={setisTrip}/>
          )
          : (
            <UserInfo func={setisTrip}/>
          )
        }
        </div>
        <div className="flex-1 bg-white shadow-xl rounded-2xl sm:h-1/3">
          {/* <Note/> */}
        </div>
      </div>
    </div>
    {/* <div className="chat-window">
        <div id="messages"></div>
        <div id="users"></div>
      </div>
      <form className="chat-box" id="form">
        <input name="text" placeholder="Message" />
        <button type="submit">Submit</button>
      </form> */}
    </>
  );
};

export default ChatForm;
