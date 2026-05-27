export const tenants = [
  {
    tenantId: 'tenant-0001',
    accountId: 'CLINIC-0001',
    clinicName: 'ClinicFlow Demo Clinic',
  },
];

export const clinicUsers = [
  {
    tenantId: 'tenant-0001',
    userId: 'user-admin',
    username: 'admin',
    role: 'Admin',
    email: 'admin@clinicflow.demo',
    password: 'Password123!',
  },
  {
    tenantId: 'tenant-0001',
    userId: 'user-doctor',
    username: 'doctor',
    role: 'Doctor',
    email: 'doctor@clinicflow.demo',
    password: 'Password123!',
  },
  {
    tenantId: 'tenant-0001',
    userId: 'user-finance',
    username: 'finance',
    role: 'Finance',
    email: 'finance@clinicflow.demo',
    password: 'Password123!',
  },
  {
    tenantId: 'tenant-0001',
    userId: 'user-community',
    username: 'community',
    role: 'Community',
    email: 'community@clinicflow.demo',
    password: 'Password123!',
  },
];

export function findTenantByAccountId(accountId) {
  if (!accountId) return null;
  return tenants.find((tenant) => tenant.accountId.toLowerCase() === accountId.trim().toLowerCase()) || null;
}

export function findUserByTenantAndUsername(tenantId, username) {
  if (!tenantId || !username) return null;
  return (
    clinicUsers.find(
      (user) => user.tenantId === tenantId && user.username.toLowerCase() === username.trim().toLowerCase()
    ) || null
  );
}
