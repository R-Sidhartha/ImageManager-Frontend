import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loading from "../Loading/loading.gif";
import ImageModal from "./ImageModal";
import { deleteImage, updateImageName } from "../../redux/slices/imageSlice";
import DropdownMenu from "../Modals/DropdownMenu";
import EditModal from "../Modals/EditModal";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";

const ImageList = ({ selectedFolderName }) => {
  const dispatch = useDispatch();
  const { images, loadingFetch, searchMessage } = useSelector(
    (state) => state.images
  );
  const [modalImage, setModalImage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  const handleEdit = (image) => {
    setSelectedImage(image);
    setShowEditModal(true);
    setOpenDropdown(null);
  };

  const handleDelete = (image) => {
    setSelectedImage(image);
    setShowDeleteModal(true);
    setOpenDropdown(null);
  };

  const handleSaveEdit = (newName) => {
    dispatch(updateImageName({ imageId: selectedImage._id, newName: newName }));
  };

  const handleConfirmDelete = () => {
    dispatch(deleteImage(selectedImage._id));
    setShowDeleteModal(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">
        {" "}
        {selectedFolderName ? (
          <>
            Images in{" "}
            <span className="text-green-700 font-bold text-xl uppercase">
              {selectedFolderName}
            </span>
          </>
        ) : (
          "Images"
        )}
      </h2>
      {loadingFetch && (
        <img src={loading} alt="Loading" width={80} className="mx-auto" />
      )}
        {!loadingFetch && images.length === 0 && (
        <div className="col-span-full text-center text-gray-500">
          No images found, try creating folder and upload one to it.
        </div>
      )}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        {!loadingFetch && searchMessage && (
          <div className="col-span-full text-center text-red-500">
            {searchMessage}
          </div>
        )}
        {!loadingFetch && !searchMessage &&
          images.map((image) => (
            <div key={image._id} className="relative">
              <button
                onClick={() =>
                  handleImageClick(
                    `https://imagemanager-server.onrender.com/images${image.imageUrl}`
                  )
                }
                className="bg-black p-2 rounded cursor-pointer relative overflow-hidden w-full"
              >
                <img
                  src={`https://imagemanager-server.onrender.com/images${image.imageUrl}`}
                  alt={image.name}
                  className="w-full h-52 object-cover rounded mb-2"
                />
                <div className="text-center text-white">{image.name}</div>
              </button>
              <div className="absolute bottom-1 right-2 text-white">
                <DropdownMenu
                  isOpen={openDropdown === image._id}
                  onEdit={() => handleEdit(image)}
                  onDelete={() => handleDelete(image)}
                />
              </div>
            </div>
          ))}
      </div>
      {modalImage && (
        <ImageModal imageUrl={modalImage} onClose={handleCloseModal} />
      )}
      <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveEdit}
        fromImage={true}
        />
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        fromImage={true}
      />
    </div>
  );
};

export default ImageList;
