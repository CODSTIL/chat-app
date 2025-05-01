/* eslint-disable react/prop-types */
// Ensure you're using the correct hook

import { useEffect } from "react";
import useConversation from "../../store/useConverSation";
import { useSocketContext } from "../../context/SocketContext";


const Conversation = ({ conversation, lastIdx,emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  useEffect( () => {
      return () => setSelectedConversation(null);
  } ,[])


  const isSelected = selectedConversation?._id === conversation._id;

  return (
    <>
      <div
        className={`flex gap-2 items-center p-1 py-2 max-h-13 cursor-pointer rounded-md transition duration-500 ease-in-out ${
          isSelected ? "bg-sky-500" : ""
        } `}
        onClick={() => setSelectedConversation(conversation)} 
      >
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={conversation.profilePic} alt="Profile" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex flex-row justify-between">
            <p className={`text-lg font-semibol text-slate-200 ${isSelected ? 'text-yellow-200' : ''}`}>
              {conversation.fullname}
            </p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className='divider my-0 py-0 h-1' />}
    </>
  );
};

export default Conversation;
