import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Sidebar } from './components/layout/Sidebar';
import { UserList } from './components/users/UserList';
import { RoleList } from './components/roles/RoleList';
import { PermissionList } from './components/permissions/PermissionList';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const [activeView, setActiveView] = useState('Users');

  return (
    <Provider store={store}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar onNavigate={setActiveView} activeView={activeView} />
        <main className="flex-1 overflow-y-auto p-8">
          {activeView === 'Users' && <UserList />}
          {activeView === 'Roles' && <RoleList />}
          {activeView === 'Permissions' && <PermissionList />}
        </main>
        <Toaster position="top-right" />
      </div>
    </Provider>
  );
}