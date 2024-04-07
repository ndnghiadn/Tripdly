// import data from "../fakeData";
import { useEffect, useState } from "react";
import TextType from "./MessageItem";
import { MessageType } from "@/constants/common/";
import axiosClient from "@/api/axiosClient";

const MessageBox = ({ messages, current, messageAlert, hostId }) => {
  const [data, setData] = useState<MessageType[]>([]);
  useEffect(() => {
    setData(
      messages.map((message) => ({
        ava: "",
        name: getUserFullname(message.userId),
        time: message.createdAt,
        type: "text",
        content: message.content,
        reply: null,
        role: hostId == current._id ? "host" : "guest",
        site: message.userId === current._id ? "me" : "other"
      }))
    );
  }, [messages]);
  const getUserFullname = async (id: string) => {
    try {
      const user = await axiosClient.get(`/user/${id}`, {
        withCredentials: true
      });
      return user.username;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-end p-5 h-[88rem] w-full overflow-y-auto bg-cover bg-no-repeat bg-[url('/images/lighthouse.jpg')]">
        {data.map((e, key) => {
          switch (e.type) {
            case "link":
              return <div key={key}></div>;
            case "image":
              return <div key={key}></div>;
            default:
              return <TextType params={e} key={key} />;
          }
        })}
        <div className="text-right text-red-800 font-semibold mr-9">
          {messageAlert}
        </div>
      </div>
    </>
  );
};

export default MessageBox;
