import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:gr8wTh50x@localhost:5433/clinicflow',
});

export async function POST(request) {
  const { accountId, username } = await request.json();

  if (!accountId || !username) {
    return Response.json(
      { success: false, message: 'Account ID and Username are required to request a password reset.' },
      { status: 400 }
    );
  }

  try {
    const userResult = await pool.query(
      'SELECT email FROM clinic_users WHERE tenant_id = $1 AND username = $2',
      [accountId, username]
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
