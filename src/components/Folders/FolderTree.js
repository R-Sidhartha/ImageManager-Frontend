import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFolders,
  deleteFolder,
  updateFolder,
} from "../../redux/slices/folderSlice";
import { toast } from "react-toastify";
import loadingpng from "../Loading/loading.gif";
import DropdownMenu from "../Modals/DropdownMenu";
import EditModal from "../Modals/EditModal";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";

const FolderTree = ({ onSelectFolder, selectedFolder, onFolderDelete }) => {
  const dispatch = useDispatch();
  const { folders, loading, error } = useSelector((state) => state.folders);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFolderToEdit, setSelectedFolderToEdit] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    dispatch(fetchFolders()).then((res) => {
      if (res.error) {
        toast.error("Failed to fetch folders: " + (error.message || error));
      }
    });
  }, [dispatch, error]);

  const toggleFolder = (folderId) => {
    setExpandedFolders((prevState) => ({
      ...prevState,
      [folderId]: !prevState[folderId],
    }));
  };

  const handleEdit = (folder) => {
    setSelectedFolderToEdit(folder);
    setShowEditModal(true);
    setOpenDropdown(null);
  };

  const handleDelete = (folder) => {
    setSelectedFolderToEdit(folder);
    setShowDeleteModal(true);
    setOpenDropdown(null);
  };

  const handleSaveEdit = (newName) => {
    dispatch(
      updateFolder({ folderId: selectedFolderToEdit._id, newName: newName })
    );
  };

  const handleConfirmDelete = () => {
    dispatch(deleteFolder(selectedFolderToEdit._id)).then(() => {
      onFolderDelete(selectedFolderToEdit._id);
    });
    setShowDeleteModal(false);
  };

  const renderFolders = (folders, parentFolder = null) => {
    return folders
      .filter((folder) => folder.parentFolder === parentFolder)
      .map((folder) => (
        <div key={folder._id} className="ml-4">
          <div
            className={`p-2 mb-1 cursor-pointer flex justify-between items-center rounded ${
              folder._id === selectedFolder
                ? "bg-black text-white"
                : "bg-gray-100"
            }`}
            onClick={() => onSelectFolder(folder._id, folder.name)}
          >
            <div>
              {folders.some((f) => f.parentFolder === folder._id) && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFolder(folder._id);
                  }}
                  className="mr-2 cursor-pointer"
                >
                  {expandedFolders[folder._id] ? " ▼ " : " ▶ "}
                </span>
              )}
              {folder.name}
            </div>
            <div
              className={`mt-1 ${
                folder._id === selectedFolder ? " text-white" : "text-black"
              }`}
            >
              <DropdownMenu
                isOpen={openDropdown === folder._id}
                onEdit={() => handleEdit(folder)}
                onDelete={() => handleDelete(folder)}
              />
            </div>
          </div>
          {expandedFolders[folder._id] && (
            <div>{renderFolders(folders, folder._id)}</div>
          )}
        </div>
      ));
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Folders</h2>
      {loading && (
        <img src={loadingpng} alt="Loading" width={40} className="mx-auto" />
      )}{" "}
      {!loading && folders.length === 0 && (
        <div className="text-center text-gray-500">
          No folders found, create one
        </div>
      )}
      {!loading && folders.length > 0 && <div>{renderFolders(folders)}</div>}
      <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveEdit}
        fromImage={false}
      />
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        fromImage={false}
      />
    </div>
  );
};

export default FolderTree;
