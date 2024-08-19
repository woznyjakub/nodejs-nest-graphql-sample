# Nest.js + React.js Monorepo rich starter

## Technologies and features included

- Node.js
- TypeScript
- Nest.js
- Docker
- PostgreSQL
- React.js
- Tailwind CSS

### Backend

- SWC compiler (non-default in Nest.js)
- PNPM package manager instead of NPM
- Docker
- DB module (PostgreSQL + TypeORM)
- Nginx reverse proxy
- CORS resolved by reverse proxy setting
- .env handling and validation
- Makefile
- Eslint (with option to use different rules in src and tests)
- Prettier
- Husky pre-commit hook (lint + test) separately for frontend and backend
- Vitest unit test setup
- Winston logger (with log file output)
- TraceId implementation
- Per-request state module using AsyncLocalStorage from node:async_hooks API
- Swagger
- PNPM Workspaces + global install command
- Global error handler

### Todo Backend

- Redis cache
- Mailer
- DTO validation with class-transformer and class-validator
- Authentication + user entity
- Multer with file uploads to AWS S3 + setting nginx to handle uploads
- CI (GitHub or EC2 + Jenkins)
- SSL
- Healthcheck module
- E2E tests with Cypress

### Frontend

- Initialized with Vite: TypeScript + SWC
- Tailwind CSS
- Docker setup
- Nginx setup

### Todo Frontend

- Vitest
- research (!)
