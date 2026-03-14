import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import AfterLogin from "./AfterLogin";  
import AdminApi from "./pages/AdminApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(){

return(

<BrowserRouter>

<ToastContainer
position="top-right"
autoClose={3000}
theme="colored"
/>

<Routes>

<Route path="/" element={<Login/>}/>

<Route path="/register" element={<Register/>}/>

<Route path="/reset" element={<ResetPassword/>}/>

<Route path="/dashboard" element={<AfterLogin/>}/>


<Route path="/adminapi" element={<AdminApi/>}/>

</Routes>

</BrowserRouter>

);

}

export default App;