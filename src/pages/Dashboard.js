import React, { useEffect, useState } from "react";
import CreateFolder from "../components/Folders/CreateFolder";
import FolderTree from "../components/Folders/FolderTree";
import UploadImage from "../components/Images/UploadImage";
import ImageList from "../components/Images/ImageList";
import SearchBar from "../components/Search/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { RxCrossCircled } from "react-icons/rx";
import { fetchFolders } from "../redux/slices/folderSlice";
import { fetchImages } from "../redux/slices/imageSlice";

const Dashboard = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedFolderName, setSelectedFolderName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { folders } = useSelector((state) => state.folders);

  useEffect(() => {
    const loadFolders = async () => {
      await dispatch(fetchFolders());
      setLoading(false);
    };
    loadFolders();
  }, [dispatch]);

  // Fetch images when selectedFolder changes
  useEffect(() => {
    if (selectedFolder) {
      dispatch(fetchImages({ folderId: selectedFolder }));
    }
  }, [selectedFolder, dispatch]);

  useEffect(() => {
    if (!loading && folders.length > 0 && !selectedFolder) {
      // Set the default folder to the first folder in the list
      setSelectedFolder(folders[0]._id);
      setSelectedFolderName(folders[0].name);
    }
  }, [loading, folders, selectedFolder]);

  const handleFolderSelect = (folderId, folderName) => {
    setSelectedFolder(folderId);
    setSelectedFolderName(folderName);
  };

  const handleNewFolder = (newFolder) => {
    setSelectedFolder(newFolder._id);
    setSelectedFolderName(newFolder.name);
  };

  const handleFolderDelete = (deletedFolderId) => {
    // Set selectedFolder to the next available folder
    const remainingFolders = folders.filter(
      (folder) => folder._id !== deletedFolderId
    );
    if (remainingFolders.length > 0) {
      setSelectedFolder(remainingFolders[0]._id);
      setSelectedFolderName(remainingFolders[0].name);
      dispatch(fetchImages({ folderId: remainingFolders[0]._id }));
    } else {
      setSelectedFolder(null);
      setSelectedFolderName("");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-screen md:min-h-full md:flex justify-center">
      {/* Menu Toggle Button */}
      <button
        className="block md:hidden mb-4 p-2 rounded-md z-30"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        Folders &rarr;
      </button>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 w-full sm:w-1/2 md:w-1/4 md:relative md:flex md:mt-4 md:bg-white flex-col transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } z-30`}
      >
        <button
          className="absolute top-0 right-0 md:hidden p-2 rounded-md z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <RxCrossCircled className="text-2xl" />
        </button>
        <CreateFolder onNewFolder={handleNewFolder} parentFolder={null} />
        <FolderTree
          onSelectFolder={handleFolderSelect}
          selectedFolder={selectedFolder}
          onFolderDelete={handleFolderDelete}
        />
      </div>
      <div className={`md:w-[74%] md:pl-4 transition-all md:mt-4`}>
        {folders && folders.length > 0 && (
        <SearchBar
          selectedFolder={selectedFolder}
          selectedFolderName={selectedFolderName}
        />
        )}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-10">
          {folders && folders.length > 0 && (
          <UploadImage
            selectedFolderName={selectedFolderName}
            selectedFolder={selectedFolder}
          />
          )}
          {folders && folders.length > 0 && (
            <CreateFolder
              onNewFolder={handleNewFolder}
              parentFolder={selectedFolder}
              selectedFolderName={selectedFolderName}
            />
          )}
        </div>
        <ImageList
          selectedFolderName={selectedFolderName}
          selectedFolder={selectedFolder}
        />
      </div>
    </div>
  );
};

export default Dashboard;
