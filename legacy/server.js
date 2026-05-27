const path = require('path');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:gr8wTh50x@localhost:5433/clinicflow',
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'website')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/login', async (req, res) => {
  const accountId = req.body.accountId?.trim();
  const username = req.body.username?.trim();
  const password = req.body.password;

  if (!accountId || !username || !password) {
    return res.status(400).json({ success: false, message: 'Account ID, Username, and Password are required.' });
  }

  try {
    const tenantResult = await pool.query(
      'SELECT tenant_id, clinic_name FROM tenants WHERE lower(account_id) = lower($1)',
      [accountId]
    );
    if (tenantResult.rowCount === 0) {
      return res.status(401).json({ success: false, message: 'Clinic Account ID not found.' });
    }

    const tenant = tenantResult.rows[0];
    const userResult = await pool.query(
      'SELECT user_id, username, role, email, password_hash FROM clinic_users WHERE tenant_id = $1 AND lower(username) = lower($2)',
      [tenant.tenant_id, username]
    );

    if (userResult.rowCount === 0) {
      return res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }

    const user = userResult.rows[0];
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }

    return res.json({
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
    return res.status(500).json({ success: false, message: 'An internal error occurred.' });
  }
});

app.post('/api/forgot-password', async (req, res) => {
  const accountId = req.body.accountId?.trim();
  const username = req.body.username?.trim();

  if (!accountId || !username) {
    return res.status(400).json({ success: false, message: 'Account ID and Username are required to request a password reset.' });
  }

  try {
    const tenantResult = await pool.query(
      'SELECT tenant_id FROM tenants WHERE lower(account_id) = lower($1)',
      [accountId]
    );

    if (tenantResult.rowCount === 0) {
      return res.json({
        success: false,
        message: 'Account not found. Please contact daviddegroeve@gmail.com for help if you do not know your Account ID or Username.',
      });
    }

    const tenantId = tenantResult.rows[0].tenant_id;
    const userResult = await pool.query(
      'SELECT email FROM clinic_users WHERE tenant_id = $1 AND lower(username) = lower($2)',
      [tenantId, username]
    );

    if (userResult.rowCount === 0) {
      return res.json({
        success: false,
        message: 'Account not found. Please contact daviddegroeve@gmail.com for help if you do not know your Account ID or Username.',
      });
    }

    return res.json({
      success: true,
      message: 'A password reset request has been received. A reset link would be sent to the registered email address for this account.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ success: false, message: 'An internal error occurred.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'website', 'index.html'));
});

app.listen(port, () => {
  console.log(`ClinicFlow app server running on http://localhost:${port}`);
});
