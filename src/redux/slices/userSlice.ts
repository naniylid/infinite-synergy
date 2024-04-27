import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CardSliceState, Users } from '../../types/types';

const initialState: CardSliceState = {
  user: null,
  editedName: '',
  editedEmail: '',
  editedCompany: '',
  editedWebsite: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Users | null>) {
      state.user = action.payload;
    },

    setEditedName(state, action: PayloadAction<string>) {
      state.editedName = action.payload;
    },
    setEditedEmail(state, action: PayloadAction<string>) {
      state.editedEmail = action.payload;
    },
    setEditedCompany(state, action: PayloadAction<string>) {
      state.editedCompany = action.payload;
    },
    setEditedWebsite(state, action: PayloadAction<string>) {
      state.editedWebsite = action.payload;
    },
  },
});

export const { setUser, setEditedCompany, setEditedEmail, setEditedName, setEditedWebsite } =
  usersSlice.actions;

export const selectUserSlice = (state: RootState) => state.usersSlice;

export default usersSlice.reducer;
