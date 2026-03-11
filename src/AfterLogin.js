import React, { useState } from "react";
import Users from "./Users";
import Employees from "./Employees";

function AfterLogin() {

const [page,setPage] = useState("dashboard");
const [adminSection,setAdminSection] = useState("");

return(

<div className="container-fluid">

<div className="row">

{/* Sidebar */}

<div className="col-md-2 bg-dark text-white vh-100 p-3">

<h4>Admin Panel</h4>

<ul className="nav flex-column">

<li className="nav-item mb-2">
<button className="btn btn-dark w-100"
onClick={()=>setPage("dashboard")}>
Dashboard
</button>
</li>

<li className="nav-item mb-2">
<button className="btn btn-dark w-100"
onClick={()=>setPage("admin")}>
Admin
</button>
</li>

<li className="nav-item">
<button className="btn btn-dark w-100"
onClick={()=>setPage("profile")}>
Profile
</button>
</li>

</ul>

</div>


{/* Main Content */}

<div className="col-md-10 p-4">

{page === "dashboard" && (

<h2>Welcome to Dashboard</h2>

)}



{/* ADMIN PAGE */}

{page === "admin" && (

<div>

<h2 className="mb-4">Admin Panel</h2>

{/* CARDS */}

<div className="row mb-4">

<div className="col-md-4">
<div className="card shadow text-center p-3">
<h4>Total Users</h4>
<h2>120</h2>
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


{/* BUTTONS */}

<div className="mb-4">

<button
className="btn btn-primary me-3"
onClick={()=>setAdminSection("users")}
>
Users
</button>

<button
className="btn btn-success me-3"
onClick={()=>setAdminSection("employees")}
>
Employees
</button>

<button
className="btn btn-secondary"
onClick={()=>setAdminSection("others")}
>
Others
</button>

</div>


{/* CONTENT AREA */}

{adminSection === "users" && <Users/>}

{adminSection === "employees" && <Employees/>}

{adminSection === "others" && (

<div className="card p-3">

<h4>Other Settings</h4>

<p>This section can contain reports, logs, or analytics.</p>

</div>

)}

</div>

)}



{page === "profile" && (

<h2>Profile Page</h2>

)}

</div>

</div>

</div>

);

}

export default AfterLogin;