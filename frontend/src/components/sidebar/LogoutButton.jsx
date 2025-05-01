import { CiLogout } from "react-icons/ci";
import { useLogout } from "../../hooks/useLogout";
const LogoutButton = () => {
  
  const{loading,logout} = useLogout();

  const handleLogOut = async() => {
      await logout();
  }

  return (
    <div className="mt-auto cursor-pointer" onClick={handleLogOut} >
      {loading ? "checking out" :  <CiLogout  size={32}/>}
    </div>
  )
}

export default LogoutButton
