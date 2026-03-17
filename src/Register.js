import React, { useState } from "react";
import { auth, database } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, push } from "firebase/database";
import "./Register.css";

function Register({ closeModal }) {

const [form, setForm] = useState({
image:"",
firstname:"",
lastname:"",
email:"",
password:"",
phonenumber:"",
city:"",
domain:""
});

const handleChange = (e)=>{
setForm({
...form,
[e.target.name]:e.target.value
});
};

const handleSubmit = async (e)=>{
e.preventDefault();

try{

const userCredential = await createUserWithEmailAndPassword(
auth,
form.email,
form.password
);

const user = userCredential.user;

await push(ref(database,"users"),{
uid:user.uid,
firstname:form.firstname,
lastname:form.lastname,
email:form.email,
phonenumber:form.phonenumber,
city:form.city,
domain:form.domain
});

alert("User Registered Successfully");

closeModal();

}catch(error){
alert(error.message);
}

};

return (

<div className="popup">

<div className="popup-inner">

<h3>Register User</h3>

<form onSubmit={handleSubmit}>

<input name="firstname" placeholder="First Name" onChange={handleChange} required/>

<input name="lastname" placeholder="Last Name" onChange={handleChange} required/>

<input name="email" placeholder="Email" onChange={handleChange} required/>

<input type="password" name="password" placeholder="Password" onChange={handleChange} required/>

<input name="phonenumber" placeholder="Phone Number" onChange={handleChange} required/>

<input name="city" placeholder="City" onChange={handleChange} required/>

<input name="domain" placeholder="Domain" onChange={handleChange} required/>

<button type="submit" className="btn btn-warning btn-sm me-2">Register</button>

<button type="button" className="btn btn-danger btn-sm" onClick={closeModal}>Close</button>

</form>

</div>

</div>

);

}

export default Register;    