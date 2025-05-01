import { useRef, useEffect } from "react";
import useGetMessages from "./useGetMessages";

const useAutoScroll = () => {
  const ref = useRef(null);
  
  const {messages} = useGetMessages();

  const executeScroll = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    executeScroll();
  }, [messages]);

  return ref;
};

export default useAutoScroll;
