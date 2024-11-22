export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: 'active' | 'inactive';
  createdAt: string;
};

export type Role = {
  id: string;
  name: string;
  permissions: Permission[];
  description: string;
};

export type Permission = {
  id: string;
  name: string;
  description: string;
  module: string;
};