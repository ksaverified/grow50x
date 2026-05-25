const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:gr8wTh50x@localhost:5433/clinicflow',
});

const demoTenantId = '22222222-2222-2222-2222-222222222222';
const demoClinicName = 'Demo Clinic Seed';
const demoLicense = 'DEMO-0002';
const demoUsers = [
  { username: 'admin', role: 'Admin', email: 'admin@demo.clinic', password: 'Password123!' },
  { username: 'doctor', role: 'Doctor', email: 'doctor@demo.clinic', password: 'Password123!' },
  { username: 'finance', role: 'Finance', email: 'finance@demo.clinic', password: 'Password123!' },
];

async function seed() {
  try {
    await pool.query('BEGIN');

    await pool.query(
      `INSERT INTO tenants (id, slug, name_en, timezone, locale, active, created_at, updated_at, tenant_id, clinic_name, moh_license_number)
       VALUES ($1, $2, $3, 'Asia/Riyadh', 'ar-SA', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $4, $5, $6)
       ON CONFLICT (slug) DO NOTHING` ,
      [
        'demo-clinic',
        'demo-clinic',
        demoClinicName,
        demoTenantId,
        demoClinicName,
        demoLicense,
      ]
    );

    for (const user of demoUsers) {
      const hash = await bcrypt.hash(user.password, 10);
      await pool.query(
        `INSERT INTO clinic_users (tenant_id, username, password_hash, email, role)
         VALUES ($1::uuid, $2, $3, $4, $5)
         ON CONFLICT (tenant_id, username)
         DO UPDATE SET password_hash = EXCLUDED.password_hash, email = EXCLUDED.email, role = EXCLUDED.role` ,
        [demoTenantId, user.username, hash, user.email, user.role]
      );
    }

    await pool.query('COMMIT');
    console.log('Demo tenant and users created successfully.');
    console.log('Account ID:', demoTenantId);
    console.log('Admin username:', 'admin', 'Password: Password123!');
    console.log('Doctor username:', 'doctor', 'Password: Password123!');
    console.log('Finance username:', 'finance', 'Password: Password123!');
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Failed to seed demo data:', error);
  } finally {
    await pool.end();
  }
}

seed();
