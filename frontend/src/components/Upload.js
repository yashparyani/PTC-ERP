import React, { useState } from "react";
import axios from "axios";
import "./Upload.css";

function Upload({ onClose , setShowUpload}) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "https://ptc-erp-apis.vercel.app/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Add token to header
          },
        }
      );

      if (response.data.success) {
        alert(response.data.message);
        setShowUpload(false);
        console.log(response.data.stocks);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
    }
  };

  return (
    <div className="upload-wrapper">
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
      <h2 className="upload-title">Upload File</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          type="file"
          className="upload-input"
          onChange={handleFileChange}
        />
        <button type="submit" className="upload-btn">
          Upload
        </button>
      </form>
      {file && (
        <p className="upload-file-info">
          Selected File: <strong>{file.name}</strong>
        </p>
      )}
    </div>
  );
}

export default Upload;
