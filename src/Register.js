import React, { useState } from "react";
import { auth, database } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

function Register() {

const [formData,setFormData] = useState({
firstname:"",
lastname:"",
age:"",
mailid:"",
phonenumber:"",
degree:"",
city:"",
district:"",
passedout:"",
experience:"",
domain:"",
password:""
});

const [showPassword,setShowPassword] = useState(false);

const handleChange=(e)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
});
};

const handleRegister=(e)=>{
e.preventDefault();

// Validation
if(!formData.firstname || !formData.mailid || !formData.password){
toast.error("Please fill required fields");
return;
}

createUserWithEmailAndPassword(auth,formData.mailid,formData.password)

.then((userCredential)=>{

const user = userCredential.user;

set(ref(database,"users/"+user.uid),{
...formData,
uid:user.uid
});

toast.success("Registration Successful 🎉");

})
.catch((error)=>{
toast.error(error.message);
});
};

return(

<div className="register-container">

<div className="register-card">

<h2 className="title">Create Account</h2>
<p className="subtitle">Fill the details to register</p>

<form onSubmit={handleRegister}>

<div className="grid">

<input
name="firstname"
placeholder="First Name"
onChange={handleChange}
/>

<input
name="lastname"
placeholder="Last Name"
onChange={handleChange}
/>

<input
name="age"
placeholder="Age"
onChange={handleChange}
/>

<input
name="mailid"
placeholder="Email"
onChange={handleChange}
/>

<input
name="phonenumber"
placeholder="Phone Number"
onChange={handleChange}
/>

<input
name="degree"
placeholder="Degree"
onChange={handleChange}
/>

<input
name="city"
placeholder="City"
onChange={handleChange}
/>

<input
name="district"
placeholder="District"
onChange={handleChange}
/>

<input
name="passedout"
placeholder="Passed Out Year"
onChange={handleChange}
/>

<input
name="experience"
placeholder="Experience"
onChange={handleChange}
/>

<input
name="domain"
placeholder="Domain"
onChange={handleChange}
/>

<div className="password-box">

<input
type={showPassword ? "text" : "password"}
name="password"
placeholder="Password"
onChange={handleChange}
/>

<span
className="show-btn"
onClick={()=>setShowPassword(!showPassword)}
>
{showPassword ? "Hide" : "Show"}
</span>

</div>

</div>

<button className="register-btn">
Register
</button>

</form>

</div>

<ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
closeOnClick
pauseOnHover
theme="colored"
/>

</div>

);

}

export default Register;