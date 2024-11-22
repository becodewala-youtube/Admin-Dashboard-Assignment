import React, { useState } from 'react';
import { Plus, Search, Pencil, Trash2, MoreVertical } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { Permission } from '../../types';
import { Menu, Transition } from '@headlessui/react';
import { deletePermission } from '../../store/slices/permissionsSlice';
import { PermissionModal } from './PermissionModal';
import { cn } from '../../utils';
import toast from 'react-hot-toast';

export function PermissionList() {
  const dispatch = useDispatch();
  const permissions = useSelector((state: RootState) => state.permissions.permissions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<Permission | undefined>();
  const [searchQuery, setSearchQuery] = useState('');

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  const filteredGroups = Object.entries(groupedPermissions).filter(([module, perms]) =>
    perms.some(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleEditPermission = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsModalOpen(true);
  };

  const handleDeletePermission = (permissionId: string) => {
    if (window.confirm('Are you sure you want to delete this permission?')) {
      dispatch(deletePermission(permissionId));
      toast.success('Permission deleted successfully');
    }
  };

  const handleAddPermission = () => {
    setSelectedPermission(undefined);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search permissions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <button
          onClick={handleAddPermission}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Permission
        </button>
      </div>

      <div className="grid gap-6">
        {filteredGroups.map(([module, permissions]) => (
          <div
            key={module}
            className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
          >
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white capitalize">
                {module} Module
              </h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {permissions.map((permission) => (
                <div
                  key={permission.id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {permission.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {permission.description}
                    </p>
                  </div>
                  <Menu as="div" className="relative">
                    <Menu.Button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                      <MoreVertical className="h-5 w-5" />
                    </Menu.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-in"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700 dark:divide-gray-600">
                        <div className="px-1 py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => handleEditPermission(permission)}
                                className={cn(
                                  'flex w-full items-center px-2 py-2 text-sm rounded-md',
                                  active
                                    ? 'bg-blue-500 text-white'
                                    : 'text-gray-900 dark:text-gray-300'
                                )}
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => handleDeletePermission(permission.id)}
                                className={cn(
                                  'flex w-full items-center px-2 py-2 text-sm rounded-md',
                                  active
                                    ? 'bg-red-500 text-white'
                                    : 'text-gray-900 dark:text-gray-300'
                                )}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <PermissionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPermission(undefined);
        }}
        permission={selectedPermission}
      />
    </div>
  );
}