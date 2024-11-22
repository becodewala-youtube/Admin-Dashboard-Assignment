import React from 'react';
import { Users, Shield, Key, Settings, Sun, Moon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice';
import { RootState } from '../../store';
import { cn } from '../../utils';

const navigation = [
  { name: 'Users', icon: Users },
  { name: 'Roles', icon: Shield },
  { name: 'Permissions', icon: Key },
  { name: 'Settings', icon: Settings },
];

interface SidebarProps {
  onNavigate: (view: string) => void;
  activeView: string;
}

export function Sidebar({ onNavigate, activeView }: SidebarProps) {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  return (
    <div className="flex h-full w-64 flex-col bg-white dark:bg-gray-900">
      <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => onNavigate(item.name)}
              className={cn(
                'group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium',
                activeView === item.name
                  ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </button>
          );
        })}
      </nav>
      <div className="border-t border-gray-200 p-4 dark:border-gray-800">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="flex w-full items-center justify-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="ml-3">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </div>
  );
}