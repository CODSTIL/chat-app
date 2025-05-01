/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../store/useConverSation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  //let sendChat = true;

  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
   
  const fromMe = message.fromMe || message.senderId === authUser._id;

  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-400" : "";

  const shakeClass = message.shouldShake ? "shake" : "";
  
   console.log(authUser.username);
  // useEffect(() => {
  //   console.log("Full message Objec",message)
  //   console.log(authUser.fullname);
  //   console.log(selectedConversation);
  //   console.log(formattedTime);
  //   console.log(fromMe);
  //   console.log(profilePic);
  //   console.log(chatClassName);
  // }, [selectedConversation, formattedTime, fromMe, profilePic, chatClassName]);

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
