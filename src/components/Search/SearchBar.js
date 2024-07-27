import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchImages } from '../../redux/slices/imageSlice';

const SearchBar = ({selectedFolder, selectedFolderName}) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(fetchImages({query: query, folderId:selectedFolder}));
  };

  return (
    <form onSubmit={searchHandler} className="bg-white flex md:justify-center items-center p-4 rounded shadow-md mb-4 gap-6">
      <input
        type="text"
        placeholder={`Search images in ${selectedFolderName.toUpperCase()}`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-3/4 p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="md:w-[10%] p-2 bg-blue-500 text-white rounded hover:bg-blue-600 ">Search</button>
    </form>
  );
};

export default SearchBar;
