import React, { useState } from "react";
import { database, storage } from "./firebase";
import { ref, push } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import "./Register.css";

function Register({ closeModal }) {

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phonenumber: "",
    city: "",
    domain: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // handle text inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // handle image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // validation (optional)
      if (!file.type.startsWith("image/")) {
        alert("Only image files allowed");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert("Max size 2MB");
        return;
      }

      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // submit - store directly to Firebase Realtime Database
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      // 1. upload image to firebase storage (if image selected)
      if (image) {
        const imgRef = storageRef(
          storage,
          `users/${Date.now()}-${image.name}`
        );

        await uploadBytes(imgRef, image);
        imageUrl = await getDownloadURL(imgRef);
      }

      // 2. store user data directly in realtime database
      await push(ref(database, "users"), {
        userId: `user_${Date.now()}`,
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
        password: form.password,
        phonenumber: form.phonenumber,
        city: form.city,
        domain: form.domain,
        image: imageUrl,
        createdAt: new Date().toISOString()
      });

      toast.success("User Registered Successfully!");
      closeModal();

    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Error registering user: " + error.message);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">

        <h3>Register User</h3>

        <form onSubmit={handleSubmit}>

          <input
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            required
          />

          <input
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <input
            name="phonenumber"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />

          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
            required
          />

          <input
            name="domain"
            placeholder="Domain"
            onChange={handleChange}
            required
          />

          {/* Image Upload - now optional */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {/* Preview */}
          {preview && (
            <img src={preview} alt="preview" width="100" />
          )}

          <br />

          <button type="submit" className="btn btn-warning btn-sm me-2">
            Register
          </button>

          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={closeModal}
          >
            Close
          </button>

        </form>
      </div>
    </div>
  );
}

export default Register;
