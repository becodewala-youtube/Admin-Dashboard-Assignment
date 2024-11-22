import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '../../types';

interface RolesState {
  roles: Role[];
  loading: boolean;
  error: string | null;
}

const initialState: RolesState = {
  roles: [
    {
      id: '1',
      name: 'Admin',
      permissions: [],
      description: 'Full system access',
    },
    {
      id: '2',
      name: 'Editor',
      permissions: [],
      description: 'Can edit content',
    },
    {
      id: '3',
      name: 'Viewer',
      permissions: [],
      description: 'Read-only access',
    },
  ],
  loading: false,
  error: null,
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    addRole: (state, action: PayloadAction<Role>) => {
      state.roles.push(action.payload);
    },
    updateRole: (state, action: PayloadAction<Role>) => {
      const index = state.roles.findIndex(role => role.id === action.payload.id);
      if (index !== -1) {
        state.roles[index] = action.payload;
      }
    },
    deleteRole: (state, action: PayloadAction<string>) => {
      state.roles = state.roles.filter(role => role.id !== action.payload);
    },
    setRoles: (state, action: PayloadAction<Role[]>) => {
      state.roles = action.payload;
    },
  },
});

export const { addRole, updateRole, deleteRole, setRoles } = rolesSlice.actions;
export default rolesSlice.reducer;