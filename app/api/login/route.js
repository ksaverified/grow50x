import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:gr8wTh50x@localhost:5433/clinicflow',
});

export async function POST(request) {
  const { accountId, username, password } = await request.json();

  if (!accountId || !username || !password) {
    return Response.json(
      { success: false, message: 'Account ID, Username, and Password are required.' },
      { status: 400 }
    );
  }

  try {
    const tenantResult = await pool.query('SELECT tenant_id, clinic_name FROM tenants WHERE tenant_id = $1', [accountId]);
    if (tenantResult.rowCount === 0) {
      return Response.json(
        { success: false, message: 'Clinic Account ID not found.' },
        { status: 401 }
      );
    }

    const tenant = tenantResult.rows[0];
    const userResult = await pool.query(
      'SELECT user_id, username, role, email, password_hash FROM clinic_users WHERE tenant_id = $1 AND username = $2',
      [accountId, username]
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
        accountId: tenant.tenant_id,
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
