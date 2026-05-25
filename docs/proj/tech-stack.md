# Technology Stack

## Overview

ClinicFlow is built as a modern web application that combines a React-based frontend with a PostgreSQL-backed server-side API. The solution is designed to support multi-tenant clinic operations, secure access control, and future expansion into clinical, administrative, and financial modules.

## Frontend

- **Framework:** Next.js
- **Rendering:** Server-side rendering and client-side React components
- **Styling:** Tailwind CSS
- **Pages:** `app/page.jsx`, `app/login/page.jsx`, `app/dashboard/page.jsx`, `app/plans/page.jsx`, `app/about/page.jsx`
- **Static assets:** `legacy/website/` holds archived HTML/CSS/JS content and media

## Backend

- **Runtime:** Node.js
- **API:** Next.js route handlers in `app/api/`
- **Legacy server:** Express-based server in `legacy/server.js` for the static website and older APIs
- **Authentication:** Custom username/password flow using `bcryptjs`
- **Environment config:** `dotenv`

## Database

- **Database engine:** PostgreSQL
- **Schema files:** `database/schema.sql`, `database/schema_update.sql`, `database/schema_users.sql`
- **Seed data:** `database/seed-demo.js`
- **Tenant model:** `tenants` table plus tenant-aware foreign keys

## Dependencies

- `next` - React application framework
- `react`, `react-dom` - UI library
- `tailwindcss` - Utility-first CSS
- `bcryptjs` - Password hashing
- `dotenv` - Environment variable management
- `pg` - PostgreSQL client

## Dev tooling

- `typescript` - Type checking support for the Next.js app
- `@types/node`, `@types/react` - Type definitions
- `eslint` / `eslint-config-next` - Linting support if configured

## Deployment

Recommended deployment options:

- **Vercel** for the Next.js app (if connected to a separate production database)
- **Node / PM2** or **Docker** for custom deployments
- **PostgreSQL managed service** or local container for production data

## Runtime configuration

Key files:

- `next.config.js` - Next.js build/runtime configuration
- `tailwind.config.js` / `tailwind.config.ts` - Tailwind content and plugin configuration
- `.env.local` / `.env.example` - Environment variables for local development

## Recommended production services

- **PostgreSQL** for tenant data
- **Nginx** or **managed load balancer** for HTTPS termination
- **Secrets manager** for database credentials and application secrets
- **Monitoring** for uptime, API latency, and database health

## Notes for extension

- Add a dedicated `components/` folder for reusable UI elements
- Add a proper auth/session layer for production-grade login
- Add reporting and billing services as separate modules
- Introduce API versioning and stable contracts for external integration
