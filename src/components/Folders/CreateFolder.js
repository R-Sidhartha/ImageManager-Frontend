import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFolder } from "../../redux/slices/folderSlice";
import { toast } from "react-toastify";

const CreateFolder = ({ onNewFolder, parentFolder, selectedFolderName }) => {
  const [folderName, setFolderName] = useState("");
  const dispatch = useDispatch();
  const { loadingCreate, errorCreate } = useSelector((state) => state.folders);

  useEffect(() => {
    if (errorCreate) {
      toast.error(errorCreate.message || errorCreate);
    }
  }, [errorCreate]);

  const createFolderHandler = (e) => {
    e.preventDefault();
    if (!folderName) return;
    const folderData = { name: folderName, parentFolder: parentFolder };
    dispatch(createFolder(folderData)).then((res) => {
      if (!res.error) {
        toast.success("Folder created successfully!");
        onNewFolder(res.payload);
        setFolderName("");
      }
    });
  };

  return (
    <form
      onSubmit={createFolderHandler}
      className="bg-white p-4 rounded shadow-md mb-4"
    >
      <h2 className="text-xl font-bold mb-2">
        {parentFolder ? (
          <>
            Create Folder in{" "}
            <span className="text-green-700 font-bold text-xl uppercase">
              {selectedFolderName}
            </span>
          </>
        ) : (
          "Create New Folder"
        )}
      </h2>
      <input
        type="text"
        placeholder="Folder Name"
        value={folderName}
        minLength={3}
        required
        onChange={(e) => setFolderName(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <div className="w-11/12 my-1 text-sm">
        {parentFolder && (
          <>
            <span className="text-red-500">Note: </span>This folder will be the nested folder within the parent folder 
            <span className="underline mx-1">
              {selectedFolderName}
            </span>
          </>
        )}
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-green-700 text-white rounded hover:bg-green-600"
      >
        {loadingCreate ? "Creating..." : "Create Folder"}
      </button>
    </form>
  );
};

export default CreateFolder;
