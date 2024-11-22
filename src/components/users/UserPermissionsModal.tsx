import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Shield, Check, AlertCircle } from 'lucide-react';
import { User } from '../../types';
import { cn } from '../../utils';

interface UserPermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
}

export function UserPermissionsModal({ isOpen, onClose, user }: UserPermissionsModalProps) {
  const groupedPermissions = user?.role.permissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, typeof user.role.permissions>) || {};

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="flex items-center justify-between text-lg font-medium text-gray-900 dark:text-white mb-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-500" />
                    Permissions for {user?.name}
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </Dialog.Title>

                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
                      {user?.role.name}
                    </span>
                    {user?.role.description}
                  </div>
                </div>

                {Object.keys(groupedPermissions).length > 0 ? (
                  <div className="space-y-4">
                    {Object.entries(groupedPermissions).map(([module, permissions]) => (
                      <div
                        key={module}
                        className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                      >
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 capitalize">
                          {module} Module
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {permissions.map((permission) => (
                            <div
                              key={permission.id}
                              className="flex items-center gap-2 text-sm bg-white dark:bg-gray-700 p-2 rounded"
                            >
                              <Check className="h-4 w-4 text-green-500" />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {permission.name}
                                </p>
                                <p className="text-gray-500 dark:text-gray-400">
                                  {permission.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
                    <AlertCircle className="h-12 w-12 mb-2" />
                    <p>No permissions assigned to this role</p>
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}