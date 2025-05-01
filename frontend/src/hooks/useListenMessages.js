import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../store/useConverSation";

const useListenMessages = () => {
   const {socket} = useSocketContext();
   const {messages,setMessages} = useConversation();

   useEffect( () => {
    //   socket?.on("newMessage", (newMessage) => {
    //       setMessages([...messages,newMessage]);
    //   } )
    socket?.on("newMessage", (newMessage) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...newMessage, fromMe: newMessage.senderId === authUser._id },
        ]);
      });
   },[socket,setMessages,messages] )
}

export default useListenMessages
