# Mini Job Queue Dashboard

A simple job queue dashboard built with NestJS, TypeORM, React, and Tailwind CSS. It lets users create background jobs, view status counts, filter jobs by status, update job statuses following strict transition rules, and delete jobs.

## Setup

### Server

1. Go to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create or check `server/.env`:

   ```env
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

4. Start the backend:
   ```bash
   npm run start:dev
   ```
   The backend API will run at `http://localhost:3000`. In development, it uses an automatic local SQLite database (`database.sqlite`).

### Client

1. Go to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create or check `client/.env`:

   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. Start the frontend:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173/`.

## Important Decisions

- **Database (SQLite locally, PostgreSQL in production)**: SQLite was chosen for local development so the app runs right away without installing or running a separate database server. In production, it connects to PostgreSQL using the `DATABASE_URL` environment variable.
- **UUIDs for Job IDs**: We use UUIDs instead of simple auto-incrementing numbers (1, 2, 3...) so IDs cannot be easily guessed and never collide across background workers. The backend also validates incoming IDs using NestJS's `ParseUUIDPipe`.
- **DTO Validation**: Incoming request data is checked using `class-validator` and NestJS `ValidationPipe`. If someone sends empty fields or unexpected properties, the backend rejects the request immediately.
- **Backend Controls State Transitions**: Status transition rules are enforced on the server (`ALLOWED_TRANSITIONS`), not left to the frontend. A job can only go from `pending` -> `running`, and from `running` -> `completed` or `failed`. Any invalid transition returns an HTTP 409 Conflict.
- **Concurrency Check on Status Updates**: When updating a status, the database query updates only if the job's current status matches what we read (`update({ id, status: currentStatus }, { status: newStatus })`). If another request changed it first, `affected === 0` triggers a 409 Conflict error. This stops race conditions without table locks.
- **Custom React Hooks**: Frontend API calls are wrapped in clean custom hooks (`useGetJobs`, `useCreateJob`, `useUpdateJobStatus`, `useDeleteJob`) using a shared `apiHandler`. This keeps components clean, manages loading/error states in one place, and reloads the job list automatically when actions finish.

## Assumptions

- Job progression is one-way: `pending` can only move to `running`, and `running` can only finish as `completed` or `failed`. Once a job is completed or failed, it cannot change status again.
- Jobs can be deleted at any time, regardless of their current status.

## Trade-offs

- **Refetching after actions instead of WebSockets**: The dashboard refetches data after mutations instead of maintaining a live WebSocket connection. This kept the app simpler and very reliable for the project scope.
- **Client-Side Filtering**: Filtering by status happens directly in React on the loaded list. For thousands of jobs, this would need server-side pagination and query filters, but for normal queue views it keeps interactions instant.

## Additional Improvements That Could Be Done

- **Server-Side Pagination**: Add page numbers and limits to `GET /jobs` so huge queues load smoothly.
- **Real Background Worker**: Integrate a queue system like BullMQ with Redis to process jobs in the background automatically.
- **More Automated Tests**: Add more end-to-end and integration tests to verify edge cases and concurrent calls.

## Bonus

**Concurrency Protection via Atomic Database Updates**:

- **What was added**: In `JobsService.updateJobStatus`, the update query matches both the job ID and its current status (`this.jobRepository.update({ id, status: currJob.status }, { status: newStatus })`), checking `affected === 0` to return an HTTP 409 error if the state changed in the background.
- **Why it was chosen**: In real queue systems, two users or workers could try to update the same job at the same time.
- **How it improves the application**: It prevents race conditions and makes sure finished jobs are not accidentally overwritten.

## Links

Frontend: https://mini-job-queued-dashboard.vercel.app/  
API: https://mini-job-queued-dashboard.onrender.com/
