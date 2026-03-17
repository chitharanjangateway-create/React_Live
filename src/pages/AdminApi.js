import React, { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../adminapi";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminApi() {

    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

        const fetchUsers = async () => {

            const res = await getUsers();

            if (res.data) {

            const data = Object.keys(res.data).map(key => ({
                id: key,
                ...res.data[key]
            }));

            setUsers(data);

        } else {
            setUsers([]);
        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (editId) {
            await updateUser(editId, { name, email });
            setEditId(null);
        } else {
            await createUser({ name, email });
        }

        setName("");
        setEmail("");

        fetchUsers();

    };

    const handleEdit = (user) => {

        setName(user.name);
        setEmail(user.email);
        setEditId(user.id);

    };

    const handleDelete = async (id) => {

        await deleteUser(id);
        fetchUsers();

    };

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">Admin API Dashboard</h2>

            <div className="row">


                



                {/* <div className="col-md-4">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white text-center">

                            <h5>{editId ? "Update User" : "Add New User"}</h5>

                        </div>

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">Name</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">Email</label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />

                                </div>

                                <button className="btn btn-success w-100">

                                    {editId ? "Update User" : "Add User"}

                                </button>

                            </form>

                        </div>

                    </div>

                </div> */}



                <div className="col-12">

                    <div className="card shadow">

                        <div className="card-header bg-dark text-white">

                            <h5>User List</h5>

                        </div>

                        <div className="card-body">

                            <table className="table table-bordered table-hover">

                                <thead className="table-dark">

                                    <tr>

                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {users.map((user) => (
                                        <tr key={user.id}>

                                            <td>{user.id}</td>
                                            <td>{user.firstname}</td>
                                            <td>{user.lastname}</td>

                                            <td>{user.email}</td>

                                            <td>

                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => handleEdit(user)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminApi;