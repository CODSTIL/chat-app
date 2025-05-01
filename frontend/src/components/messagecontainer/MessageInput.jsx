import { useState } from "react";
import { FiSend } from "react-icons/fi";
import useSendMessage from "../../hooks/useSendMessage";
import { useSocketContext } from "../../context/SocketContext";

const MessageInput = () => {
  
  const [message,setMessage] = useState("")

  const {loading,sendMessage} = useSendMessage();
  const {socket} = useSocketContext();
  
  const handleSend = async(e) => {
     e.preventDefault();
     if(!message) return 
     socket.emit('chat-message' , message);
     await sendMessage(message);
     setMessage("");
  }

  return (
    <form>
      <div className="flex items-center gap-2 px-4 py-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input input-bordered input-md w-full rounded-md px-4"
          placeholder="Type your message..."
        />
        <button className="text-sky-500 hover:text-sky-600 transition-all p-2" onClick={handleSend}>
          {loading ? <div className='loading loading-spinner'></div> : <FiSend/> }
        </button>
      </div>
    </form>
  );
};



export default MessageInput;
