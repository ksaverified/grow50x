import { findTenantByAccountId, findUserByTenantAndUsername } from '../../lib/mockData';

export async function POST(request) {
  const { accountId, username } = await request.json();

  if (!accountId || !username) {
    return Response.json(
      { success: false, message: 'Account ID and Username are required to request a password reset.' },
      { status: 400 }
    );
  }

  try {
    const tenant = findTenantByAccountId(accountId);
    const user = tenant ? findUserByTenantAndUsername(tenant.tenantId, username) : null;

    if (!tenant || !user) {
      return Response.json({
        success: false,
        message: 'Account not found. Please contact daviddegroeve@gmail.com for help if you do not know your Account ID or Username.',
      });
    }

    return Response.json({
      success: true,
      message: 'A password reset request has been received. A reset link would be sent to the registered email address for this account.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return Response.json(
      { success: false, message: 'An internal error occurred.' },
      { status: 500 }
    );
  }
}
