"use client";
import { useUserStore } from "@/lib/zustand";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "../../components/chat/MessageBox";
import MessageHeader from "../../components/chat/MessageHeader";
import MessageTool from "../../components/chat/MessageTool";
import InforTrip from "../../components/chat/InforTrip";
import UserInfo from "../../components/chat/UserInfor";
import Block from "../../components/chat/Block";
import { BlockUI } from "primereact/blockui";
import Header from "@/components/header/header";

export const ChatForm: React.FC<String> = ({ tripId }) => {
  const { current } = useUserStore();

  const socketRef = useRef(null);
  const newMessageRef = useRef(null);

  const isLogin = true;
  const [isTrip, setisTrip] = useState(true);
  const dummy = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [trip, setTrip] = useState();
  const inputRef = useRef<HTMLInputElement>(null);
  const [messageAlert, setMessageAlert] = useState<string>("");

  const handleSendMessage = async () => {
    const time = new Date();
    if (inputRef.current) {
      addMessage({
        content: inputRef.current.value.trim(),
        createdAt: time.toISOString(),
        tripId: tripId,
        userId: current._id
      });
      setMessageAlert("Sending message...");
    }

    try {
      // Send the message text
      await socketRef.current?.send(
        JSON.stringify({
          text: inputRef.current?.value.trim()
        })
      );
      inputRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const addUser = (username: string) => {
    users.push(username);
  };

  const removeUser = (username: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user !== username));
  };

  useEffect(() => {
    document.cookie = "tripId=" + tripId + "; path=/";

    if (!socketRef.current) {
      //Start a connection to chat server
      socketRef.current = new WebSocket("ws://localhost:8888/chat");
    }

    if (!newMessageRef.current) {
      //Start a connection to new message server
      newMessageRef.current = new WebSocket("ws://localhost:8888/new-message");
    }

    // Listen for messages
    socketRef.current?.addEventListener("message", (e) => {
      // Data sent will be a string so parse into an object
      const event = JSON.parse(e.data);
      console.log("event message", event);

      // Server sets a type for each message
      switch (event.type) {
        case "MESSAGES_ADD":
          // addMessage(event.data);
          if (event.data.userId === current._id) {
            setMessageAlert("Message sent");
          } else {
            setMessageAlert("");
          }
          break;
        case "MESSAGES_SET":
          setMessages(event.data);
          break;
        case "USERS_ADD":
          addUser(event.data);
          break;
        case "USERS_REMOVE":
          removeUser(event.data);
          break;
        case "USERS_SET":
          setUsers(event.data);
          break;
        case "TRIP_SET":
          setTrip(event.data);
          break;
      }
    });

    newMessageRef.current.addEventListener("message", (e) => {
      const event = JSON.parse(e.data);
      console.log(event);
    });
  }, [tripId]);
  console.log("members", users.length);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex sm:px-2 h-[90vh] w-full">
          {/* <div className="bg-white h-full w-1/12">
        <SideBar/>
      </div> */}
          {current._id ? (
            <div className="bg-[#F6F8FA] h-full w-full sm:w-4/5 sm:mr-3 flex flex-col rounded-xl">
              <div className="flex-grow-0">
                <MessageHeader />
              </div>
              <div className="flex-1 overflow-auto no-scrollbar" ref={dummy}>
                <MessageBox
                  messages={messages}
                  current={current}
                  messageAlert={messageAlert}
                  hostId={trip?.createdBy}
                />
              </div>
              <div className="flex-grow-0">
                <MessageTool
                  inputRef={inputRef}
                  handleSendMessage={handleSendMessage}
                />
              </div>
            </div>
          ) : (
            <BlockUI
              template={<Block />}
              containerClassName="h-full w-11/12 sm:w-4/5 sm:mr-3 flex flex-col rounded-xl "
              blocked={true}
            >
              <div className="blur-sm h-full w-full mr-3 flex flex-col rounded-xl">
                <div className="flex-grow-0">
                  <MessageHeader />
                </div>
                <div className="flex-1 overflow-auto no-scrollbar" ref={dummy}>
                  <MessageBox
                    messages={messages}
                    current={current}
                    messageAlert={messageAlert}
                  />
                </div>
                <div className="flex-grow-0">
                  <MessageTool
                    inputRef={inputRef}
                    handleSendMessage={handleSendMessage}
                  />
                </div>
              </div>
            </BlockUI>
          )}
          <div className="h-full sm:flex hidden flex-col sm:gap-1 md:gap-2 sm:w-1/4">
            <div className="flex-1 mb-4 sm:h-2/3">
              {isTrip ? (
                <InforTrip
                  func={setisTrip}
                  trip={trip}
                  members={users.length}
                />
              ) : (
                <UserInfo func={setisTrip} />
              )}
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
      </div>
    </>
  );
};
