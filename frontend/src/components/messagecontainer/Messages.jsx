//import useAutoScroll from "../../hooks/useAutoScroll.js"
import useGetMessages from "../../hooks/useGetMessages.js";
import Message from "./Message";
import MessageSkeleton from "../skeleton/MessageSkeleton.jsx";
import { useEffect, useId, useRef } from "react";
import useListenMessages from "../../hooks/useListenMessages.js";

const Messages = () => {
  const lastMessageRef = useRef();
  const { loading, messages } = useGetMessages();
  useListenMessages();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  const id = useId();
  // const isValidMessage = (message) => {
  //   return message && message.senderId && message.message && message.createdAt
  // }

  return (
    <div className="px-4 flex-1 overflow-auto" key={id}>
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
