
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../store/useConverSation";
import { useEffect } from "react";

const MessageContainer = () => {
  
    const {selectedConversation,setSelectedConversation} = useConversation();
   
   
    useEffect(() => {
      // cleanup function (unmounts)
      return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[600px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2 opacity-80 bg-transparent">
            <span className="label-text font-semibold text-md">To : {selectedConversation.fullname} </span>
            <span className="text-gray-900 font-bold"></span>
            <div className="divider px-3"></div>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  let {authUser} = useAuthContext();
  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
          <p>Welcome {authUser.username}👋 ❄</p>
          <p>Select a chat to start messaging</p>
          <TiMessages className="text-3xl md:text-6xl text-center" />
        </div>
      </div>
    </>
  );
};

export default MessageContainer;
