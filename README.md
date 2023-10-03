# Online Auction System

- live at: https://auction-app-rose.vercel.app/
- demo: https://www.loom.com/share/8257615cd253428388a1b22327da40fb?sid=82f441d1-80f1-4955-a744-349feac1ed28

Welcome to the Online Auction System! This application allows users to create and bid on items in real-time auctions.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Tests](#tests)
- [Architecture Overview](#architecture-overview)
- [Contributing](#contributing)
- [License](#license)

## Tech Stack

- **Frontend:**

  - [Next.js](https://nextjs.org/): A React framework for building the user interface.
  - [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for styling.
  - [Shadcn UI](https://ui.shadcn.com/docs): A UI component library.

- **Backend:**

  - [Prisma](https://prisma.io/): Database ORM for data modeling and queries.
  - [tRPC](https://trpc.io/): A TypeScript-first API development framework.

- **Database:**

  - [PlanetScale (MySQL)](https://planetscale.com/): A cloud-hosted MySQL database platform.

- **Authentication:**

  - Custom authentication logic.

- **Testing:**
  - [Vitest](https://vitest.dev/): Blazing Fast Unit Test Framework.
  - [E2E testing](https://playwright.dev/): Playwright enables reliable end-to-end testing for modern web apps.

## Setup

Follow these steps to set up the Online Auction System on your local machine:

### Prerequisites

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- PostgreSQL: [Download and Install PostgreSQL](https://www.postgresql.org/)

### Installation

1. Clone the repository

2. Navigate to the project directory:

   ```bash
   cd auction-app
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Create a `.env` file from env.example and set the following environment variables:

   ```env
   DATABASE_URL=postgresql://yourusername:yourpassword@localhost:5432/online_auction
   JWT_SECRET=your_jwt_secret_here
   ```

   Replace `yourusername`, `yourpassword`, and `your_jwt_secret_here` with your MySQL credentials and a secure JWT secret.

5. Set up the database using Prisma:

   ```bash
   npx prisma db push
   ```

6. Start the server:

   ```bash
   npm run dev
   ```

7. The application should now be running at `http://localhost:3000`.

## Tests

To run tests, execute the following command:

```bash
npm test
```

This will run unit tests, integration tests, and end-to-end tests to ensure the application's functionality is working as expected.

## Architecture Overview

The Online Auction System follows a multi-tier architecture:

- **Frontend:** Built using Next.js with a responsive user interface.

- **Backend:** Written in Node.js using tRPC for REST API endpoints (E2E typesafety). The database is managed with Prisma.

- **Database:** MySQL hosted on PlanetScale is used as the database system to store user information, auction items, bids, transactions, and invoices.

- **Authentication:** User authentication is implemented using custom authentication logic.

- **Testing:** The project includes unit tests, integration tests, and end-to-end tests to ensure reliability and correctness.

### Commands

```bash
pnpm build      # runs `prisma generate` + `prisma migrate` + `next build`
pnpm db-reset   # resets local db
pnpm dev        # starts next.js
pnpm test-dev   # runs e2e tests on dev
pnpm test-start # runs e2e tests on `next start` - build required before
pnpm test:unit  # runs normal Vitest unit tests
pnpm test:e2e   # runs e2e tests
```

## TODO list:

1. Real-time updates are handled using ably.io. However, in term of scaling. The application should be updated to use a message queue such as RabbitMQ or Kafka to handle real-time updates.
2. Handle batch query for cron job, and timeout for cron job.
3. Add more unit tests, integration tests, and end-to-end tests to ensure reliability and correctness.
4. Add more features such as: search, filter, pagination, etc.
5. Reset password and verify email resend.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

```
