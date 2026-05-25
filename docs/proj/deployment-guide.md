# Deployment Guide

## Prerequisites

- Node.js installed (compatible with Next.js 14)
- PostgreSQL database
- `npm` or `yarn` package manager
- Optional: Docker for containerized deployments

## Local setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment sample:
   ```bash
   cp .env.example .env.local
   ```
4. Configure the database connection in `.env.local`:
   ```env
   DATABASE_URL=postgres://user:password@localhost:5432/clinicflow
   ```

## Database initialization

1. Create the PostgreSQL database:
   ```sql
   CREATE DATABASE clinicflow;
   ```
2. Apply the schema from `database/schema.sql`.
3. Use `database/seed-demo.js` to load demo data if needed.

## Running in development

Start the Next.js application:

```bash
npm run dev
```

This launches the app on `http://localhost:3000`.

## Building for production

Build the app:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Legacy website and static assets

The legacy static site is located in `legacy/website/`. If you need to run the archived static version, use the legacy Express server:

```bash
node legacy/server.js
```

This serves the legacy website and API endpoints from the `legacy/website` folder.

## Recommended deployment patterns

### Option 1: Containerized deployment

- Use Docker for the application and PostgreSQL database.
- Build a production image from the root project.
- Mount or seed the database schema on startup.

### Option 2: Managed platform

- Deploy the Next.js app to a managed hosting provider such as Vercel or Netlify.
- Use a managed PostgreSQL instance for production data.
- Store secrets in environment variables or a vault.

## Production environment checklist

- Use HTTPS/TLS for all traffic.
- Store database credentials securely.
- Enable logging and monitoring.
- Regularly back up database data.
- Validate the `DATABASE_URL` and any app-specific environment settings.

## Notes

- If you add new API routes, ensure they are covered by any production security policies.
- Keep local development and production config isolated.
- Use schema migration tools for ongoing database updates instead of manual SQL edits.
