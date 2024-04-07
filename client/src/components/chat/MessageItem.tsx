import { MessageType } from "../../constants/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const TextType = ({ params }: { params: MessageType }) => {
  const time = params.time?.slice(0, 10) + " " + params.time?.slice(11, 16);
  return (
    <>
      {params.site === "me" && params.content !== "" ? (
        <div className="flex mb-3 mr-10 ">
          <div className="flex-1"></div>
          <div className="flex-1 flex justify-end gap-2">
            <div>
              <div className="flex justify-end">
                <p
                  className="bg-gray-300 bg-opacity-75 backdrop-blur-sm backdrop-filter rounded-md inline-block font-sans dark:text-white text-sm font-medium
                             px-2 py-2.5 rounded-br-sm rounded-bl-2xl rounded-tr-2xl rounded-tl-2xl"
                >
                  {params.content}
                </p>
              </div>
              <p className="text-xs font-sans">
                {time} • {params.name}
              </p>
            </div>
            {params.role === "host" ? (
              <div className="flex flex-col items-center relative -top-2 gap-1">
                <p>👑</p>
                <Avatar className="w-9 h-9">
                  <AvatarImage src={params.ava} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <Avatar className="w-9 h-9">
                <AvatarImage src={params.ava} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-start mb-3">
          <div className="flex-1 flex justify-start gap-9">
            {params.role === "host" ? (
              <div className="flex flex-col items-center relative -top-2 gap-1">
                <p>👑</p>
                <Avatar className="w-9 h-9">
                  <AvatarImage src={params.ava} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <Avatar className="w-9 h-9">
                <AvatarImage src={params.ava} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
            <div className="">
              <div>
                <p
                  className="bg-gray-300 bg-opacity-75 backdrop-blur-sm backdrop-filter px-2 py-2.5 font-sans font-medium rounded-br-2xl
                             rounded-bl-sm text-sm rounded-tr-2xl rounded-tl-xl inline-block"
                >
                  {params.content}
                </p>
              </div>
              <p className="text-xs font-sans">
                {params.name} • {time}
              </p>
            </div>
          </div>
          <div className="flex-1"></div>
        </div>
      )}
    </>
  );
};

export default TextType;

