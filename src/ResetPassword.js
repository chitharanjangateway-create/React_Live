import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ResetPassword.css";

function ResetPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (oldPassword === "" || newPassword === "") {
      toast.error("Please fill all fields");
      return;
    }

    // Logic for updating password would go here
    toast.success("Password Updated Successfully!");
  };

  return (
    <div className="login-page-wrapper">
      <div className="reset-card shadow-lg p-4 p-md-5 rounded-4 border-0 bg-white">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark">Change Password</h2>
          <p className="text-muted small">Update your security credentials</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-semibold">Current Password</label>
            <input
              type="password"
              className="form-control form-control-lg bg-light border-0"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              style={{ fontSize: '0.9rem' }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label small fw-semibold">New Password</label>
            <input
              type="password"
              className="form-control form-control-lg bg-light border-0"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ fontSize: '0.9rem' }}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold shadow-sm">
            Update Password
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default ResetPassword;