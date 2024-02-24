import { MessageType } from "../../utils/types";
import Ava from "./Ava";
import pic1 from "../assets/cary.jpg"
const TextType = ({params}:{params:MessageType}) => {
    return ( 
        <>
        { (params.site === "me" && params.content !== "")
            ? <div className="flex mb-3 mr-10">
                <div className="flex-1"></div>
                <div className="flex-1 flex justify-end gap-2">
                    <div>
                        <div className="flex justify-end">
                            <p className="bg-purple-500 inline-block dark:text-white text-sm font-medium px-2 py-2.5 rounded-br-sm rounded-bl-2xl rounded-tr-2xl rounded-tl-2xl">{params.content}</p>
                        </div>
                        <p className="text-xs font-sans">{params.time} • You</p>
                    </div>
                    <Ava imageUrl={params.ava} />
                </div>
                
            </div>
            : <div className="flex justify-start mb-3">
                <div className="flex-1 flex justify-start gap-9">
                    <Ava imageUrl={params.ava} />
                    <div className="">
                        <div >
                            <p className="bg-white shadow-[rgb(240,242,247)_0px_5px_5px] px-2 py-2.5 font-Poppins font-medium rounded-br-2xl rounded-bl-sm text-sm rounded-tr-2xl rounded-tl-xl inline-block">{params.content}</p>
                        </div>
                        <p className="text-xs font-sans">{params.name} • {params.time}</p>
                    </div>
                </div>
                <div className="flex-1">

                </div>
              </div>
        }
        </>
     );
}
 
export default TextType;