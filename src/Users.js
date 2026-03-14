import React, { useEffect, useState } from "react";
import { database } from "./firebase";
import { ref, onValue, remove, update } from "firebase/database";
import { toast } from "react-toastify";
import "./Users.css";
import AdminApi from "./pages/AdminApi";
import RegisterModal from "./Register";

function Users() {

const [users, setUsers] = useState([]);
const [showPopup, setShowPopup] = useState(false);
const [editId, setEditId] = useState(null);
const [showModal, setShowModal] = useState(false);

const [formData, setFormData] = useState({
firstname: "",
lastname: "",
email: "",
phonenumber: "",
city: "",
domain: ""
});



/* FETCH USERS */

useEffect(() => {

const usersRef = ref(database, "users");

onValue(usersRef, (snapshot) => {

const data = snapshot.val();

if (!data) {
setUsers([]);
return;
}

let userList = [];

for (let id in data) {

userList.push({
id: id,
...data[id]
});

}

setUsers(userList);

});

}, []);



/* DELETE USER */

const deleteUser = (id) => {

if (window.confirm("Are you sure to delete this user?")) {

remove(ref(database, "users/" + id));

toast.success("User Deleted Successfully");

}

};



/* OPEN EDIT POPUP */

const openEditPopup = (user) => {

setShowPopup(true);

setEditId(user.id);

setFormData({
firstname: user.firstname || "",
lastname: user.lastname || "",
email: user.email || "",
phonenumber: user.phonenumber || "",
city: user.city || "",
domain: user.domain || ""
});

};



/* CLOSE EDIT POPUP */

const closePopup = () => {
setShowPopup(false);
};



/* HANDLE INPUT CHANGE */

const handleChange = (e) => {

setFormData({
...formData,
[e.target.name]: e.target.value
});

};



/* UPDATE USER */

const updateUser = (e) => {

e.preventDefault();

update(ref(database, "users/" + editId), formData)

.then(() => {
toast.success("User Updated Successfully");
setShowPopup(false);
})

.catch(() => {
toast.error("Update Failed");
});

};



return (

<div className="container mt-4">


{/* DASHBOARD CARDS */}

<div className="row mb-4">

<div className="col-md-4">
<div className="card shadow text-center p-3">
<h4>Total Users</h4>
<h2>{users.length}</h2>
</div>
</div>

<div className="col-md-4">
<div className="card shadow text-center p-3">
<h4>Total Employees</h4>
<h2>45</h2>
</div>
</div>

<div className="col-md-4">
<div className="card shadow text-center p-3">
<h4>Active Domains</h4>
<h2>12</h2>
</div>
</div>

</div>



<h1>Api Method</h1>
<h3 className="mb-4">Users List</h3>



{/* USERS TABLE */}

<table className="table table-bordered table-striped">

<thead>

<tr>

<th>SN</th>
<th>Name</th>
<th>Email</th>
<th>Phone</th>
<th>City</th>
<th>Domain</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{users.map((j, index) => (

<tr key={j.id}>

<td>{index + 1}</td>

<td>{j.firstname} {j.lastname}</td>

<td>{j.email}</td>

<td>{j.phonenumber}</td>

<td>{j.city}</td>

<td>{j.domain}</td>

<td>

<button
className="btn btn-primary me-2"
onClick={() => openEditPopup(j)}
>
Edit
</button>

<button
className="btn btn-danger"
onClick={() => deleteUser(j.id)}
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>



{/* ADD USER BUTTON */}

<button
onClick={() => setShowModal(true)}
className="btn btn-success mb-4"
>
Add User
</button>



{/* REGISTER MODAL */}

{showModal && (
<RegisterModal closeModal={() => setShowModal(false)} />
)}



{/* EDIT POPUP */}

{showPopup && (

<div className="popup-overlay">

<div className="popup-card">

<h4 className="mb-3">Edit User</h4>

<form onSubmit={updateUser}>

<input
type="text"
name="firstname"
placeholder="First Name"
value={formData.firstname}
onChange={handleChange}
className="form-control mb-2"
/>

<input
type="text"
name="lastname"
placeholder="Last Name"
value={formData.lastname}
onChange={handleChange}
className="form-control mb-2"
/>

<input
type="email"
name="email"
placeholder="Email"
value={formData.email}
onChange={handleChange}
className="form-control mb-2"
/>

<input
type="text"
name="phonenumber"
placeholder="Phone"
value={formData.phonenumber}
onChange={handleChange}
className="form-control mb-2"
/>

<input
type="text"
name="city"
placeholder="City"
value={formData.city}
onChange={handleChange}
className="form-control mb-2"
/>

<input
type="text"
name="domain"
placeholder="Domain"
value={formData.domain}
onChange={handleChange}
className="form-control mb-3"
/>

<button className="btn btn-success me-2">
Update
</button>

<button
type="button"
className="btn btn-secondary"
onClick={closePopup}
>
Cancel
</button>

</form>

</div>

</div>

)}



{/* SECOND DASHBOARD */}

<AdminApi />

</div>

);

}

export default Users;