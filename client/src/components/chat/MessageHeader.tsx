import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
// import { useAuthStore } from "../store/auth";

const MessageHeader = () => {
    const isLogin = true;
    return ( 
        <div className="rounded-full flex bg-white mx-5 mt-3 py-2 px-3 gap-5 shadow-[rgb(240,242,247)_0px_4px_4px]">
          <AvatarGroup max={4}>
            <Avatar alt="Remy Sharp" sx={{ width: 30, height: 30 }} src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" sx={{ width: 30, height: 30 }} src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" sx={{ width: 30, height: 30 }} src="/static/images/avatar/3.jpg" />
            <Avatar alt="+  " sx={{ width: 30, height: 30 }} src="/static/images/avatar/4.jpg" />
          </AvatarGroup>
          {isLogin ? (
            <div className="flex justify-between flex-1 items-center ">
              <p>Hmm feeling the trip's not suitable for ya</p>
              <button className="text-white bg-red-500 font-medium rounded-full text-sm px-2 py-1">
                Leave
              </button>
            </div>
          ) : (
            <div className="flex justify-between flex-1 items-center">
              <p>Hey wanna get diffirent experients from this trip</p>
              <button className="text-white bg-green-500 font-medium rounded-full text-sm px-3 py-1.5">
                Join us
              </button>
            </div>
          )}
        </div>
    );
}
 
export default MessageHeader;