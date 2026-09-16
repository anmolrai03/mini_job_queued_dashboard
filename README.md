# Mini Job Queue Dashboard

A full-stack job queue dashboard built with NestJS, TypeORM (SQLite), React, and Tailwind CSS. The system allows users to enqueue background jobs, track live status counts, filter jobs by status, execute valid status transitions through a backend-enforced state machine, and delete jobs.

## Setup

### Server

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run start:dev
   ```
   The backend API will run at `http://localhost:3000`. The SQLite database file (`database.sqlite`) is created and synchronized automatically.

### Client

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Verify or create environment variables in `client/.env`:

   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173/`.

## Important Decisions

- **SQLite via `better-sqlite3` and TypeORM**: Chosen to provide zero-configuration local persistence without requiring external database services, while keeping full relational modeling and schema synchronization via TypeORM.
- **UUID Identifiers**: Generated using Node's `randomUUID()` and validated via NestJS `ParseUUIDPipe` at the controller boundary. This avoids sequential ID guessing like numbers and prevents collisions across asynchronous workers.
- **DTO Validation**: Incoming payloads (`CreateJobDto`, `UpdateJobStatusDto`) use `class-validator` decorators coupled with a global `ValidationPipe` (`whitelist: true`, `forbidNonWhitelisted: true`) to validate types, enforce allowed status values, and strip unexpected fields.
- **Backend Enforcement of Status Transitions**: The job lifecycle state machine is maintained solely on the backend (`ALLOWED_TRANSITIONS`). Requests attempting invalid status changes are rejected with an HTTP 409 Conflict.
- **Conditional Database Updates for Concurrency**: Status updates use an atomic conditional query (`update({ id, status: currentStatus }, { status: nextStatus })`). If another process changes the job state in the interim, `affected === 0` triggers an HTTP 409 Conflict, preventing race conditions.
- **Custom Hooks & API Abstraction**: Client networking is encapsulated in dedicated hooks (`useGetJobs`, `useCreateJob`, `useUpdateJobStatus`, `useDeleteJob`) over a centralized `apiHandler`. This keeps UI components decoupled from HTTP details, centralizes error management, and coordinates automatic list refetching after mutations.

## Assumptions

- Job lifecycles strictly move forward: `pending` can only transition to `running`, and `running` can transition to either `completed` or `failed`. Terminal statuses (`completed`, `failed`) cannot be modified.
- Deletion is permitted for jobs in any status .

## Trade-offs

- **Mutation-Triggered Refetching over WebSockets/SSE**: The frontend refetches job data following mutations rather than establishing persistent WebSocket connections, balancing simplicity and reliability within the assignment scope.
- **Client-Side Filtering**: Filtering by job status is computed client-side from the active job list, which is lightweight for typical dashboard sizes but would require server-side pagination for large volumes of jobs.

## Additional Improvements Than Could be Done

- **Server-Side Pagination & Filtering**: Add `limit`, `offset`, and `status` query parameters to `GET /jobs` to efficiently handle large queues.
- **Asynchronous Queue Integration**: Connect a dedicated background queue engine (e.g., BullMQ with Redis) to simulate actual background job processing.
- **Expanded Automated Tests**: Add end-to-end tests validating state machine rejections and concurrent update conflicts.

## Bonus

**Concurrency Protection via Atomic Conditional Updates**:

- **What was added**: In `JobsService.updateJobStatus`, status changes are executed conditionally against both the job ID and its currently expected status (`this.jobRepository.update({ id, status: currJob.status }, { status: newStatus })`), verifying `affected === 0` to trigger an HTTP 409 Conflict.
- **Why it was chosen**: In job queues, concurrent requests or workers can easily produce race conditions if two updates occur simultaneously.
- **How it improves the application**: Guarantees atomic state transitions and prevents stale status overwrites.

## Links

Frontend: [placeholder]  
Backend/API: [placeholder]
