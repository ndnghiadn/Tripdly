import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useEffect, useState } from "react";
import { Button } from "antd";
import {BsEmojiSmile} from "react-icons/bs"
import {GrAttachment} from "react-icons/gr"
import { log } from "console";

interface MessageToolType{
    inputRef: React.MutableRefObject<null>,
    handleButtonClick: Promise<void>
}

const MessageTool : React.FC<MessageToolType> = ({inputRef, handleButtonClick}) => {
    const [visibleEmoji, setVisibleEmoji] = useState(false);
    const handleKeyPress = async (event:any) => {
        // Check if the Enter key is pressed
        if (event.key === 'Enter') {
            await handleButtonClick();
        }
    };
    
    useEffect(() => {    
        // Attach the keypress event listener to the input element using useRef
        inputRef.current?.addEventListener('keypress', handleKeyPress);
    
        // Cleanup event listener when component unmounts
        return () => {
            if(inputRef.current){
                inputRef.current.removeEventListener('keypress', handleKeyPress);
            }
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
                        inputRef.current.value+=e.native;
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
            className="bg-gray-100 flex-1 border border-gray-400 text-black text-sm rounded-full p-2.5 "
            placeholder="Type a message ..."
          />
          <Button 
            onClick={()=>{handleButtonClick()}} />
        </div>
     );
}
 
export default MessageTool