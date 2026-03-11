import React, { useEffect, useState } from "react";
import { database } from "./firebase";
import { ref, onValue, remove, update } from "firebase/database";
import { toast } from "react-toastify";
import "./Users.css";

function Users() {

    const [users, setUsers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        mailid: "",
        phonenumber: "",
        city: "",
        domain: ""
    });


    /* FETCH USERS */

    useEffect(() => {

        const usersRef = ref(database, "users");

        onValue(usersRef, (snapshot) => {

            const data = snapshot.val();

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
            mailid: user.mailid || "",
            phonenumber: user.phonenumber || "",
            city: user.city || "",
            domain: user.domain || ""
        });

    };



    /* CLOSE POPUP */

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

            <h3 className="mb-4">Users List</h3>

            <table className="table table-bordered table-striped">

                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>Domain</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.firstname} {user.lastname}</td>
                            <td>{user.mailid}</td>
                            <td>{user.phonenumber}</td>
                            <td>{user.city}</td>
                            <td>{user.domain}</td>
                            <td>
                                <button className="btn btn-primary me-2" onClick={() => openEditPopup(user)}> Edit</button>
                                <button className="btn btn-danger" onClick={() => deleteUser(user.id)}> Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>



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
                                name="mailid"
                                placeholder="Email"
                                value={formData.mailid}
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

        </div>

    );

}

export default Users;