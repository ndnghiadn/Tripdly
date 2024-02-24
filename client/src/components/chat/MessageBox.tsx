// import data from "../fakeData";
import TextType from "./MessageItem"
const MessageBox = ({messages}) => {
    for (let i in messages) {
        data[i].content = messages[i]

    }
    return ( 
        <div className="p-5">
            {data.map((e)=>{
                switch(e.type){
                    case "link":
                        return <div></div>
                    case "image":
                        return <div></div>
                    default:
                        return <TextType params={e}/>
                }
            })}
        </div>
     );
}

const data = [
    {
        // ava: "/src/assets/rock.jpg",
        name: "host A",
        time: "12:12AM",
        type: "text",
        // content: "Hello everyone",
        reply: null,
        role: "host",
        site: "other"
    },
    {
        // ava: "/src/assets/cena.jpg",
        name: "Guest A",
        time: "12:12AM",
        type: "text",
        // content: "Hi host",
        reply: null,
        role: "guest",
        site: "me"
    },
    {
        // ava: "/src/assets/cary.jpg",
        name: "guest B",
        time: "12:12AM",
        type: "text",
        // content: "Hi host A",
        reply: "Hello everyone",
        role: "guest",
        site: "other"
    },
    {
        // ava: "/src/assets/cary.jpg",
        name: "guest B",
        time: "12:12AM",
        type: "text",
        // content: "Hi host A",
        reply: "Hello everyone",
        role: "guest",
        site: "other"
    },
    {
        // ava: "/src/assets/cary.jpg",
        name: "guest B",
        time: "12:12AM",
        type: "text",
        // content: "Hi host A",
        reply: "Hello everyone",
        role: "guest",
        site: "other"
    },
    {
        // ava: "/src/assets/cary.jpg",
        name: "guest B",
        time: "12:12AM",
        type: "text",
        // content: " worship a hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers. Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.",
        reply: "Hello everyone",
        role: "guest",
        site: "other"
    },
    {
        // ava: "/src/assets/cena.jpg",
        name: "Guest A",
        time: "12:12AM",
        type: "text",
        // content: "Hi host",
        reply: null,
        role: "guest",
        site: "me"
    },
    {
        // ava: "/src/assets/cena.jpg",
        name: "Guest A",
        time: "12:12AM",
        type: "text",
        // content: "Hi host",
        reply: null,
        role: "guest",
        site: "me"
    },
]
 
export default MessageBox;