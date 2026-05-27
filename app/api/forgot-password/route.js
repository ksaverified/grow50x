import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

const pool = connectionString ? new Pool({ connectionString }) : null;

export async function POST(request) {
  if (!pool) {
    console.error('Forgot password error: DATABASE_URL is not configured.');
    return Response.json(
      { success: false, message: 'Database not configured on this environment. Set DATABASE_URL.' },
      { status: 500 }
    );
  }
  const { accountId, username } = await request.json();

  if (!accountId || !username) {
    return Response.json(
      { success: false, message: 'Account ID and Username are required to request a password reset.' },
      { status: 400 }
    );
  }

  try {
    const tenantResult = await pool.query('SELECT tenant_id FROM tenants WHERE account_id = $1', [accountId]);
    if (tenantResult.rowCount === 0) {
      return Response.json({
        success: false,
        message: 'Account not found. Please contact daviddegroeve@gmail.com for help if you do not know your Account ID or Username.',
      });
    }

    const tenant = tenantResult.rows[0];
    const userResult = await pool.query(
      'SELECT email FROM clinic_users WHERE tenant_id = $1 AND username = $2',
      [tenant.tenant_id, username]
    );

    if (userResult.rowCount === 0) {
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
