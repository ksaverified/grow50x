# Solution Overview

## Purpose

ClinicFlow is a multi-tenant clinic management platform designed for medical practices that need a secure, centralized system with clinic-level data separation. It supports clinic account management, patient records, authentication, and role-based access for clinical and administrative teams.

## Target users

- Clinic administrators
- Doctors
- Nurses
- Receptionists
- Accountants
- IT and operations teams

## Core capabilities

- Multi-tenant clinic access using an `Account ID`
- Role-based authentication with clinic-specific users
- Patient and appointment management per clinic
- Secure database separation via tenant-aware schema
- Financial workflows for reception and accounting teams
- Administrative controls for tenant provisioning and monitoring

## Architecture

### Frontend

- `Next.js` application located at the project root under `app/`
- Uses React components and Tailwind CSS for layout and styling
- Includes pages for login, dashboard, plans, and informational content

### Backend & API

- API endpoints implemented using Next.js `app/api` routes
- Core backend logic handles login, health checks, and password support
- An older legacy Express server exists under `legacy/server.js` for the static website

### Database

- PostgreSQL is the primary data store
- Database schema files are under `database/`
- Multi-tenant data model is centered on `tenants`, `patients`, `clinic_users`, and related tables

### Data flow

1. Clinic user enters `Account ID`, username, and password.
2. The app validates the clinic tenant and user credentials.
3. Authenticated users receive access scoped to their clinic and role.
4. All patient data, appointment records, and financial activity remain tenant-specific.

## System structure

- `app/` - Production Next.js application
- `database/` - SQL schema and seed files
- `legacy/` - Archived website and legacy server code
- `docs/` - Project documentation and regulatory references
- `pgadmin_data/`, `db_data/` - PostgreSQL and pgAdmin local data stores

## Benefits

- Clear separation between clinic tenants for privacy and compliance
- Role-based workflows tailored for clinical and financial staff
- Modular structure for future expansion, including reporting, billing, and patient portals
- Documentation ready for stakeholders, administrators, and deployers
