import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: { id: '1', name: 'Admin', permissions: [], description: 'Administrator' },
      status: 'active',
      createdAt: '2024-03-10',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: { id: '2', name: 'Editor', permissions: [], description: 'Content Editor' },
      status: 'active',
      createdAt: '2024-03-10',
    },
    {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      role: { id: '3', name: 'Viewer', permissions: [], description: 'Read-only access' },
      status: 'inactive',
      createdAt: '2024-03-10',
    },
  ],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { addUser, updateUser, deleteUser, setUsers } = usersSlice.actions;
export default usersSlice.reducer;