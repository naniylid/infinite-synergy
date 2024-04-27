import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Users, Status, UsersSliceState } from '../../types/types';

export const fetchUsers = createAsyncThunk<Users[]>('users/fetchUsersStatus', async () => {
  const { data } = await axios.get<Users[]>(`https://jsonplaceholder.typicode.com/users`);

  return data;
});

const initialState: UsersSliceState = {
  items: [],
  status: Status.LOADING,
};

const apiSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Users[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = apiSlice.actions;
export const selectUsersSlice = (state: RootState) => state.apiSlice;

export default apiSlice.reducer;
