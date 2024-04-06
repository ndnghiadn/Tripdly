import { AiFillHome } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";
import { HiChatAlt2 } from "react-icons/hi";
import { BsPinMapFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { BsEscape } from "react-icons/bs";
type TIcon = {
  name: string;
};
const Icon = (props: TIcon) => {
  switch (props.name) {
    case "home":
      return <AiFillHome />;
    case "chat":
      return <HiChatAlt2 />;
    case "contributing":
      return <BsPinMapFill />;
    case "profile":
      return <BsPersonCircle />;
    case "logout":
      return <BsEscape />;
    default:
      return <AiFillMessage />;
  }
};
export default Icon;
