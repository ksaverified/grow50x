# Administrator Manual

## Purpose

This manual describes the key administration tasks for ClinicFlow, focusing on clinic onboarding, user and tenant management, and operational support.

## Administrator responsibilities

- Create and manage clinic tenants
- Provision user accounts and roles
- Monitor system health
- Support onboarding and access issues
- Review audit and operational logs

## Clinic onboarding

1. Create a new tenant record for each clinic.
2. Assign a unique `Account ID` per tenant.
3. Record clinic metadata such as clinic name, MOH license number, and contact details.
4. Seed or import initial user accounts for staff members.

## User and role management

ClinicFlow should support at least these roles:

- **Administrator**: Oversees tenant setup, user provisioning, and system access.
- **Doctor**: Accesses patient records, appointments, and clinical workflows.
- **Nurse**: Supports patient intake, notes, and preparation tasks.
- **Receptionist**: Manages scheduling, patient registration, and billing intake.
- **Accountant**: Handles invoicing, payments, and financial reporting.
- **Community**: Executes social media outreach, schedules promotional posts, and monitors engagement while keeping public communications compliant.

### Recommended user setup

- Use secure usernames.
- Assign one role per account to minimize privilege overlap.
- Require password resets on first login.

## Tenant configuration

- Review the tenant schema in `database/schema.sql`.
- Ensure tenant IDs are UUIDs and tenant-related foreign keys enforce data separation.
- Monitor tenant creation to confirm proper isolation.

## Health monitoring

- Use the `/api/health` endpoint to verify service availability.
- Confirm database connectivity and query performance regularly.
- Validate that all clinics can access their tenant data without leaking information.

## Data management

- Use `database/seed-demo.js` only for sample or demo data.
- Apply schema changes thoughtfully and use `schema_update.sql` for migrations.
- Backup PostgreSQL data before applying changes.

## Access support

- Support users who forget passwords using the password reset workflow.
- Prompt users to contact support if their clinic `Account ID` or username is lost.
- Confirm account ownership before changing sensitive access data.

## Operational recommendations

- Keep production credentials and connection strings out of source control.
- Use `.env.local` for local development and secure vaults for production.
- Document any custom tenant configuration or regulatory requirements.

## Next steps for administrators

- Expand the system with tenant billing settings, clinic hours, and workflow profiles.
- Implement an admin dashboard for user, tenant, and audit management.
- Add reporting views for clinic utilization, staff activity, and financial performance.
