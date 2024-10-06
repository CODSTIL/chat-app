

import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/signup/Signup";
import { useAuthContext } from "./context/AuthContext";

import { Routes, Route, Navigate } from "react-router-dom";

function App() {
   const { authUser } = useAuthContext();

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={ authUser ? <Home /> : <Navigate to="/login"/> } />
        <Route path="/login" element={ authUser ? <Navigate to="/" /> : <Login/> } ></Route>
        <Route path="/signup" element={authUser ? <Navigate to="/"/> : <Signup/>}/>
      </Routes>

     
        
    </div>
  );
}

export default App;
