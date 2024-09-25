/* eslint-disable no-unused-vars */

import "./App.css";
//import { useAuthContext } from "./context/AuthContext";
// import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
 import Home from "./pages/home/Home";
 import Login from "./pages/Login/Login";
 import Signup from "./pages/signup/Signup";
 import {Toaster} from 'react-hot-toast';

function App() {
 // const { authUser } = useAuthContext();



  return (
     <div className='p-4 h-screen flex items-center justify-center'>
         {/* <Login/> */}
         {/* <Signup/> */}
         <Home/>
         <Toaster position="top-center"/>
     </div>
  );
}

export default App;
