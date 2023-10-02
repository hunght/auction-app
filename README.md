Outline a high-level approach for building the online auction system and provide insights into the considerations and trade-offs at each step. Please note that this is a conceptual overview, and in practice, you would need to dive deeper into implementation details.

- Problem Approach and Trade-offs:

-Item Management:

Draft State: Allow users to create items in a draft state. Trade-off: Items in draft state won't be visible to other users until published.
Scheduling Auctions: Use a background job or scheduler to transition items from draft to published based on auction start time. Trade-off: Additional complexity and resource usage.
Authentication:

Roll Your Own Authentication: Implementing your authentication flow provides flexibility but may require more development effort compared to using prebuilt solutions like NextAuth.js. Trade-off: Security and maintenance overhead.

- Auction Logic:

Real-time Bidding: Use WebSocket for real-time updates. Trade-off: Increased complexity and potential scaling challenges compared to polling.
Bid Validation: Ensure bids meet criteria (higher than current highest bid and starting price) to maintain fairness in the auction.
Invoice Model:

Modeling Transactions: Introducing an Invoice model provides a structured way to handle transactions and associated data. Trade-off: Increased complexity compared to a simpler transaction model.

2. Project Documentation:

README.md: Create a detailed README.md that includes setup instructions, how to run tests, project architecture overview, and explanations of important design decisions and trade-offs.

3. Communication:

Maintain clear and consistent communication throughout the project. Document decisions, progress, and any challenges faced during development. Prepare for follow-up interviews to discuss the assignment in-depth. 4. Unit Tests and Integration Tests:

Write unit tests to test individual components and functions in isolation.
Write integration tests to test the interactions between different parts of your application, including the database and external services. 5. Implement Frontend:

Use a frontend framework like Next.js to build the user interface.
Implement user registration, login, and account management components.
Create UI components for listing auction items, bidding, and displaying auction details.
Implement real-time updates using WebSocket or a similar technology.
Ensure a responsive and user-friendly design. 6. Use ORM (Prisma):

Define your database schema using Prisma.
Use Prisma Client to interact with the database, including creating, reading, updating, and deleting records.
Implement database queries and mutations in a structured manner to ensure data consistency and security.
