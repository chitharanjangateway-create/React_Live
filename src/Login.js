import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {

const navigate = useNavigate();

const [mailid, setMailid] = useState("");
const [password, setPassword] = useState("");

const handleLogin = (e) => {

e.preventDefault();

if(mailid === "" || password === ""){
toast.error("Please enter email and password");
return;
}

signInWithEmailAndPassword(auth, mailid, password)

.then(() => {

toast.success("Login Successful 🎉");

setTimeout(()=>{
navigate("/dashboard");
},1500);

})

.catch(() => {

toast.error("Invalid Email or Password");

});

};

return (

<div className="login-page-wrapper">

<div className="container">

<div className="row justify-content-center">

<div className="col-md-5 col-lg-4">

<div className="card shadow-lg p-4 p-md-5 rounded-4 border-0 bg-white">

<div className="text-center mb-4">

<div className="bg-primary bg-gradient d-inline-block p-3 rounded-circle mb-3 shadow-sm">

<i className="bi bi-person-fill text-white fs-3"></i>

</div>

<h3 className="fw-bold text-dark mb-1">Welcome Back</h3>

<p className="text-muted small">
Sign in to manage your account
</p>

</div>

<form onSubmit={handleLogin}>

<div className="mb-3">

<label className="form-label small fw-semibold">
Email Address
</label>

<input
type="email"
className="form-control form-control-lg bg-light border-0"
placeholder="name@company.com"
value={mailid}
onChange={(e)=>setMailid(e.target.value)}
required
/>

</div>

<div className="mb-3">

<label className="form-label small fw-semibold">
Password
</label>

<input
type="password"
className="form-control form-control-lg bg-light border-0"
placeholder="••••••••"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

</div>

<div className="text-end mb-4">

<span
className="text-primary small fw-medium"
style={{ cursor:"pointer" }}
onClick={()=>navigate("/reset")}
>

Forgot Password?

</span>

</div>

<button className="btn btn-primary btn-lg w-100 fw-bold shadow-sm mb-3">

Sign In

</button>

</form>

<div className="text-center mt-3">

<p className="text-muted small">

Don't have an account?{" "}

<span
className="text-primary fw-bold"
style={{cursor:"pointer"}}
onClick={()=>navigate("/register")}
>

Create Account

</span>

</p>

</div>

</div>

</div>

</div>

</div>

</div>

);

}

export default Login;