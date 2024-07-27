import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  folders: [],
  loading: false,
  error: null,
};

const host = process.env.REACT_APP_HOST

export const fetchFolders = createAsyncThunk(
  "folders/fetchFolders",
  async (_, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    try {
      const response = await axios.get(`${host}/api/folders`, {
        headers: {
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createFolder = createAsyncThunk(
  "folders/createFolder",
  async (folderData, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    try {
      const response = await axios.post(
        `${host}/api/folders`,
        folderData,
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

export const updateFolder = createAsyncThunk(
  "folders/updateFolder",
  async ({ folderId, newName }, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    try {
      const response = await axios.patch(
        `${host}/api/folders/${folderId}`,
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

export const deleteFolder = createAsyncThunk(
  "folders/deleteFolder",
  async (folderId, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    try {
      await axios.delete(`${host}/api/folders/${folderId}`, {
        headers: {
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      });
      return { folderId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFolders.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.folders = payload;
      })
      .addCase(fetchFolders.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(createFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFolder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.folders.push(payload);
      })
      .addCase(createFolder.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(updateFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFolder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.folders = state.folders.map((folder) =>
          folder._id === payload._id ? payload : folder
        );
      })
      .addCase(updateFolder.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFolder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.folders = state.folders.filter(
          (folder) => folder._id !== payload.folderId
        );
      })
      .addCase(deleteFolder.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default folderSlice.reducer;
