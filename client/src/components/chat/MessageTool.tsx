import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useEffect, useState } from "react";
import { Button } from "antd";
import {BsEmojiSmile} from "react-icons/bs"
import {GrAttachment} from "react-icons/gr"

const MessageTool = ({message, setMessage, inputRef, handleButtonClick}) => {
    const [visibleEmoji, setVisibleEmoji] = useState(false);
    useEffect(() => {
        const handleKeyPress = (event) => {
            // Check if the Enter key is pressed
            if (event.key === 'Enter') {
            handleButtonClick();
            }
        };
    
        // Attach the keypress event listener to the input element using useRef
        inputRef.current.addEventListener('keypress', handleKeyPress);
    
        // Cleanup event listener when component unmounts
        return () => {
            inputRef.current.removeEventListener('keypress', handleKeyPress);
        };
    },[])
    return ( 
        <div className="flex p-4 gap-4 bg-white items-center border-x border-slate-100">
            <div>
                <div className={visibleEmoji ? "absolute bottom-16" : "hidden"}>
                    <Picker
                        data={data}
                        emojiSize={20}
                        emojiButtonSize={30}
                        previewPosition="none"
                        onEmojiSelect={(e: any) => {
                        setVisibleEmoji(!visibleEmoji);
                        setMessage(message + e.native);
                        }}
                    />
                </div>
                <BsEmojiSmile
                className="w-6 h-6 hover:bg-gray-500 hover:text-white focus:ring-4 font-medium rounded-full text-base text-center inline-flex items-center"
                onClick={() => {
                    setVisibleEmoji(!visibleEmoji);
                }}
                />
          </div>
          <GrAttachment className="h-6 w-6"/>
          <input
            ref={inputRef}
            type="text"
            id="first_name"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-gray-100 flex-1 border border-gray-400 text-black text-sm rounded-full p-2.5 "
            placeholder="Type a message ..."
          />
          <Button 
            onClick={()=>{
                let dataMessage = {
                    // ava: "/src/assets/cena.jpg",
                    name: "Guest A",
                    time: "12:12AM",
                    type: "text",
                    content: "Hi host",
                    reply: null,
                    role: "guest",
                    site: "me"
                };
                // dataMessage.content = message
                handleButtonClick()
            }} />
        </div>
     );
}
 
export default MessageTool