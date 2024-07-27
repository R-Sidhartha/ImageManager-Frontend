import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../redux/slices/imageSlice";
import { toast } from "react-toastify";

const UploadImage = ({ selectedFolderName, selectedFolder }) => {
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { loadingUpload, errorUpload, uploadSuccess } = useSelector(
    (state) => state.images
  );
  const fileInputRef = useRef(null); // Create a ref for the file input

  // Reset form fields upon successful upload
  useEffect(() => {
    if (uploadSuccess) {
      setImageName("");
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input field
      }
    } else if (errorUpload) {
      toast.error(errorUpload.message || "Upload failed.");
    }
  }, [uploadSuccess, errorUpload]);

  const uploadImageHandler = (e) => {
    e.preventDefault();
    if (!selectedFolder) {
      toast.error("Please select a folder.");
      return;
    }
    const formData = new FormData();
    formData.append("name", imageName);
    formData.append("folder", selectedFolder);
    formData.append("image", image);

    dispatch(uploadImage({ name: imageName, folder: selectedFolder, image }));
  };

  return (
    <form
      onSubmit={uploadImageHandler}
      className="bg-white p-4 rounded shadow-md mb-4"
    >
      <h2 className="text-xl font-bold mb-2">
        {selectedFolder ? (
          <>
            Upload Image in{" "}
            <span className="text-green-700 font-bold text-xl uppercase">
              {selectedFolderName}
            </span>
          </>
        ) : (
          "Upload Image"
        )}
      </h2>
      <input
        type="text"
        placeholder="Image Name"
        value={imageName}
        minLength={3}
        required
        onChange={(e) => setImageName(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-green-700 text-white rounded hover:bg-green-600"
      >
        {loadingUpload ? "Uploading..." : "Upload Image"}
      </button>
    </form>
  );
};

export default UploadImage;
