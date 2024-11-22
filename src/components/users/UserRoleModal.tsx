import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Shield } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateUser } from '../../store/slices/usersSlice';
import { User, Role } from '../../types';
import toast from 'react-hot-toast';
import { cn } from '../../utils';

interface UserRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
}

export function UserRoleModal({ isOpen, onClose, user }: UserRoleModalProps) {
  const dispatch = useDispatch();
  const roles = useSelector((state: RootState) => state.roles.roles);
  const [selectedRole, setSelectedRole] = React.useState<Role | null>(user?.role || null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole || !user) return;

    const updatedUser: User = {
      ...user,
      role: selectedRole,
    };

    dispatch(updateUser(updatedUser));
    toast.success('User role updated successfully');
    onClose();
  };

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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="flex items-center justify-between text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Assign Role to {user?.name}
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    {roles.map((role) => (
                      <label
                        key={role.id}
                        className={cn(
                          'flex items-center p-4 rounded-lg border-2 cursor-pointer transition-colors',
                          selectedRole?.id === role.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                        )}
                      >
                        <input
                          type="radio"
                          name="role"
                          className="sr-only"
                          checked={selectedRole?.id === role.id}
                          onChange={() => setSelectedRole(role)}
                        />
                        <Shield className={cn(
                          'h-5 w-5 mr-3',
                          selectedRole?.id === role.id
                            ? 'text-blue-500'
                            : 'text-gray-400'
                        )} />
                        <div className="flex-1">
                          <p className={cn(
                            'font-medium',
                            selectedRole?.id === role.id
                              ? 'text-blue-700 dark:text-blue-300'
                              : 'text-gray-900 dark:text-gray-100'
                          )}>
                            {role.name}
                          </p>
                          <p className={cn(
                            'text-sm',
                            selectedRole?.id === role.id
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-gray-500 dark:text-gray-400'
                          )}>
                            {role.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!selectedRole}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Assign Role
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}