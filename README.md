# Next.js Authentication Project with Role-Based Access

A modern authentication system built with Next.js 15, NextAuth.js v5, and Prisma, featuring role-based access control.

## Features

- 🔐 Authentication with NextAuth.js v5
- 👥 Role-based access control (RBAC)
- 🔑 Credential authentication (email/password)
- 🌐 OAuth support (GitHub)
- 🎨 Modern UI with Tailwind CSS
- 🛡️ Type-safe with TypeScript
- 🗄️ Prisma ORM with PostgreSQL

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up your environment variables:
   ```env
   DATABASE_URL="postgresql://..."
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # OAuth providers (optional)
   GITHUB_ID="your-github-id"
   GITHUB_SECRET="your-github-secret"
   ```

4. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Project Structure

```
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   └── auth/
│       ├── signin/
│       └── signup/
├── components/
│   ├── ui/
│   └── navbar.tsx
├── lib/
│   ├── prisma.ts
│   └── zod.ts
├── types/
│   └── next-auth.d.ts
├── auth.config.ts
├── auth.ts
└── middleware.ts
```

## Authentication Flow

- Users can sign in using email/password or GitHub OAuth
- JWT strategy is used for session management
- Role-based access control is implemented through Prisma schema
- Protected routes are handled via middleware

## Database Schema

The project uses a PostgreSQL database with the following main tables:
- User
- Role
- RolesOnUsers (junction table for many-to-many relationship)

## Available Roles

- USER (default)
- ADMIN

## Security Features

- Password hashing with bcrypt
- JWT-based sessions
- Protected API routes
- Type-safe authentication with TypeScript
- Secure role-based access control

## Development

To add new features or modify existing ones:

1. Create a new branch
2. Make your changes
3. Run tests (if available)
4. Submit a pull request

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
