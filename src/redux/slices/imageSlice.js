import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  images: [],
  loadingFetch: false,
  loadingUpload: false,
  loadingDelete: false,
  loadingUpdate: false,
  errorFetch: null,
  errorDelete: null,
  errorUpdate: null,
  errorUpload: null,
  uploadSuccess: false,
  deleteSuccess: false,
  updateSuccess: false,
  searchMessage: ''
};

const host = process.env.REACT_APP_HOST || 'https://imagemanager-server.onrender.com'
export const fetchImages = createAsyncThunk('images/fetchImages', async ({ query, folderId }, thunkAPI) => {
  const { auth } = thunkAPI.getState();
  try {
    const url = `${host}/api/images/folder/${folderId}${query ? '/search' : ''}`;
    const params = query ? { query } : {};

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${auth.userInfo.token}`,
      },
      params,
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});



export const uploadImage = createAsyncThunk('images/uploadImage', async (imageData, thunkAPI) => {
  const { auth } = thunkAPI.getState();
  try {
    const formData = new FormData();
    formData.append('name', imageData.name);
    formData.append('folder', imageData.folder);
    formData.append('image', imageData.image);

    const response = await axios.post(`${host}/api/images`, formData, {
      headers: {
        Authorization: `Bearer ${auth.userInfo.token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteImage = createAsyncThunk(
  'images/deleteImage',
  async (imageId, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    try {
      await axios.delete(`${host}/api/images/${imageId}`, {
        headers: {
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      });
      return { imageId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateImageName = createAsyncThunk(
  'images/updateImageName',
  async ({ imageId, newName }, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    try {
      const response = await axios.put(
        `${host}/api/images/${imageId}`,
        { name: newName },
        {
          headers: {
            Authorization: `Bearer ${auth.userInfo.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loadingFetch = true;
        state.errorFetch = null;
        state.searchMessage = ''; 
      })
      .addCase(fetchImages.fulfilled, (state, { payload }) => {
        state.loadingFetch = false;
        state.images = payload;
      })
      .addCase(fetchImages.rejected, (state, { payload }) => {
        state.loadingFetch = false;
        if (payload.message) {
          state.searchMessage = payload.message; 
        } else {
          state.errorFetch = payload;
        }
      })
      .addCase(uploadImage.pending, (state) => {
        state.loadingUpload = true;
        state.errorUpload = null;
      })
      .addCase(uploadImage.fulfilled, (state, { payload }) => {
        state.loadingUpload = false;
        state.uploadSuccess = true;
        state.images.push(payload);
      })
      .addCase(uploadImage.rejected, (state, { payload }) => {
        state.loadingUpload = false;
        state.errorUpload = payload;
        state.uploadSuccess = false;
      })
      .addCase(deleteImage.pending, (state) => {
        state.loadingDelete = true;
        state.errorDelete = null;
      })
      .addCase(deleteImage.fulfilled, (state, { payload }) => {
        state.loadingDelete = false;
        state.deleteSuccess = true;
        state.images = state.images.filter((image) => image._id !== payload.imageId);
      })
      .addCase(deleteImage.rejected, (state, { payload }) => {
        state.loadingDelete = false;
        state.errorDelete = payload;
        state.deleteSuccess = false;
      })
      .addCase(updateImageName.pending, (state) => {
        state.loadingUpdate = true;
        state.errorUpdate = null;
      })
      .addCase(updateImageName.fulfilled, (state, { payload }) => {
        state.loadingUpdate = false;
        state.updateSuccess = true;
        const index = state.images.findIndex((image) => image._id === payload._id);
        if (index !== -1) {
          state.images[index] = payload;
        }
      })
      .addCase(updateImageName.rejected, (state, { payload }) => {
        state.loadingUpdate = false;
        state.errorUpdate = payload;
        state.updateSuccess = false;
      });
  },
});

export default imageSlice.reducer;
