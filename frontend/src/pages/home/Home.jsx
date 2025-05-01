import Sidebar from "../../components/sidebar/Sidebar"
import MessageContainer from "../../components/messagecontainer/MessageContainer"
import { Toaster } from "react-hot-toast"

const Home = () => {
  return (
   <>
      <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar/>
      <MessageContainer/>
    </div>
    <Toaster position="top-center" reverseOrder={true}/>
   </>
  )
}

export default Home
