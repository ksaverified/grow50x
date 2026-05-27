import { findTenantByAccountId, findUserByTenantAndUsername } from '../../lib/mockData';

export async function POST(request) {
  const body = await request.json();
  const accountId = body.accountId?.trim();
  const username = body.username?.trim();
  const password = body.password;

  if (!accountId || !username || !password) {
    return Response.json(
      { success: false, message: 'Account ID, Username, and Password are required.' },
      { status: 400 }
    );
  }

  try {
    const tenant = findTenantByAccountId(accountId);
    if (!tenant) {
      return Response.json(
        { success: false, message: 'Clinic Account ID not found.' },
        { status: 401 }
      );
    }

    const user = findUserByTenantAndUsername(tenant.tenantId, username);
    if (!user || user.password !== password) {
      return Response.json(
        { success: false, message: 'Invalid username or password.' },
        { status: 401 }
      );
    }

    return Response.json({
      success: true,
      message: 'Login successful.',
      data: {
        accountId: tenant.accountId,
        clinicName: tenant.clinicName,
        username: user.username,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { success: false, message: 'An internal error occurred.' },
      { status: 500 }
    );
  }
}
