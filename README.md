````markdown
# Online Auction System

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
  - [Jest](https://jestjs.io/): A JavaScript testing framework.
  - [Testing Library](https://testing-library.com/): Utilities for testing React components.

## Setup

Follow these steps to set up the Online Auction System on your local machine:

### Prerequisites

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- PostgreSQL: [Download and Install PostgreSQL](https://www.postgresql.org/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/online-auction-system.git
   ```
````

2. Navigate to the project directory:

   ```bash
   cd online-auction-system
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and set the following environment variables:

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

- **Backend:** Written in Node.js using tRPC for REST API endpoints. The database is managed with Prisma.

- **Database:** MySQL hosted on PlanetScale is used as the database system to store user information, auction items, bids, transactions, and invoices.

- **Authentication:** User authentication is implemented using custom authentication logic.

- **Testing:** The project includes unit tests, integration tests, and end-to-end tests to ensure reliability and correctness.

## TODO list:

1. Real-time updates are handled using ably.io. However, in term of scaling. The application should be updated to use a message queue such as RabbitMQ or Kafka to handle real-time updates.
2. Handle batch query for cron job, and timeout for cron job.
3. Add more unit tests, integration tests, and end-to-end tests to ensure reliability and correctness.
4. Add more features such as: search, filter, pagination, etc.
5. Reset password and verify email resend.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
