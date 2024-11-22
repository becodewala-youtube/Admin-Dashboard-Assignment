import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Permission } from '../../types';

interface PermissionsState {
  permissions: Permission[];
  loading: boolean;
  error: string | null;
}

const initialState: PermissionsState = {
  permissions: [
    {
      id: '1',
      name: 'create:users',
      description: 'Create users',
      module: 'users',
    },
    {
      id: '2',
      name: 'edit:users',
      description: 'Edit users',
      module: 'users',
    },
    {
      id: '3',
      name: 'delete:users',
      description: 'Delete users',
      module: 'users',
    },
    {
      id: '4',
      name: 'manage:roles',
      description: 'Manage roles',
      module: 'roles',
    },
  ],
  loading: false,
  error: null,
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    addPermission: (state, action: PayloadAction<Permission>) => {
      state.permissions.push(action.payload);
    },
    updatePermission: (state, action: PayloadAction<Permission>) => {
      const index = state.permissions.findIndex(
        permission => permission.id === action.payload.id
      );
      if (index !== -1) {
        state.permissions[index] = action.payload;
      }
    },
    deletePermission: (state, action: PayloadAction<string>) => {
      state.permissions = state.permissions.filter(
        permission => permission.id !== action.payload
      );
    },
    setPermissions: (state, action: PayloadAction<Permission[]>) => {
      state.permissions = action.payload;
    },
  },
});

export const {
  addPermission,
  updatePermission,
  deletePermission,
  setPermissions,
} = permissionsSlice.actions;
export default permissionsSlice.reducer;