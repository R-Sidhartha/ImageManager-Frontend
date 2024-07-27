import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const userInfoFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
  : null;
  
  const initialState = {
  userInfo: userInfoFromStorage,
  loading: false,
  error: null,
};

const host = process.env.REACT_APP_HOST || 'https://imagemanager-server.onrender.com'
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${host}/api/users`, userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${host}/api/users/login`, userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  localStorage.removeItem('userInfo');
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        localStorage.setItem('userInfo', JSON.stringify(payload));
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        localStorage.setItem('userInfo', JSON.stringify(payload));
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null;
      });
  },
});

export default authSlice.reducer;
