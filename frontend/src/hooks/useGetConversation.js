import { useEffect, useState } from "react";
import toast from "react-hot-toast";
//import store from '../store/useConversation'

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  //   const {setConversations} = store( )
  

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);
  // console.log(conversations);

  return { loading, conversations };
};

export default useGetConversation;
