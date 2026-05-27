import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:gr8wTh50x@localhost:5433/clinicflow',
});

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
    const tenantResult = await pool.query(
      'SELECT tenant_id, account_id, clinic_name FROM tenants WHERE lower(account_id) = lower($1)',
      [accountId]
    );
    if (tenantResult.rowCount === 0) {
      return Response.json(
        { success: false, message: 'Clinic Account ID not found.' },
        { status: 401 }
      );
    }

    const tenant = tenantResult.rows[0];
    const userResult = await pool.query(
      'SELECT user_id, username, role, email, password_hash FROM clinic_users WHERE tenant_id = $1 AND lower(username) = lower($2)',
      [tenant.tenant_id, username]
    );

    if (userResult.rowCount === 0) {
      return Response.json(
        { success: false, message: 'Invalid username or password.' },
        { status: 401 }
      );
    }

    const user = userResult.rows[0];
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return Response.json(
        { success: false, message: 'Invalid username or password.' },
        { status: 401 }
      );
    }

    return Response.json({
      success: true,
      message: 'Login successful.',
      data: {
        accountId: tenant.account_id,
        clinicName: tenant.clinic_name,
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
