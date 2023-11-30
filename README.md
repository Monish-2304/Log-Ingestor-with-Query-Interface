# Log Ingestor and Query Interface
Live Url: https://log-ingestor-query-interface.netlify.app/
## Problem Statement
Develop a log ingestor system that can efficiently handle vast volumes of log data, and offer a simple interface for querying this data using full-text search or specific field filters.

The requirements for the log ingestor and the query interface are specified below.

### Log Ingestor:

- Develop a mechanism to ingest logs in the provided format.
- Ensure scalability to handle high volumes of logs efficiently.
- Mitigate potential bottlenecks such as I/O operations, database write speeds, etc.
- Make sure that the logs are ingested via an HTTP server, which runs on port `3000` by default.

### Query Interface:

- Offer a user interface (Web UI or CLI) for full-text search across logs.
- Include filters based on:
    - level
    - message
    - resourceId
    - timestamp
    - traceId
    - spanId
    - commit
    - metadata.parentResourceId


### Advanced Features:

- Implement search within specific date ranges.
- Utilize regular expressions for search.
- Allow combining multiple filters.
- Provide real-time log ingestion and searching capabilities.
- Implement role-based access to the query interface.

## Technology tools/components used
- NodeJs 
- React.Js
- MongoDb

## Getting Started

### How to run this project:

1. Clone the repository from GitHub:
```bash
https://github.com/dyte-submissions/november-2023-hiring-Monish-2304
```
2. Install dependencies for both frontend and backend:

```bash
cd backend
npm install
```
```bash
cd frontend
npm install
```
3. Setup MongoDb Atlas and paste the MongoDb_Uri string in .env file

4. For running the log injestor, navigate to the `backend` directory and start the log injestor:

```bash
cd backend
npm run start
```
5. For running the log query interface , navigate to the `frontend` directory and start the reach app:

```bash
cd frontend
npm run dev
```
### Features implemented:

1. Real time log ingestion and display on query interface

2. User friendly Web interface to search logs.

3. Search logs based on following filters:
   - level
   - message
   - resourceId
   - spanId
   - commit
   - timestamp
   - traceId
   - parentResourceId

4. Combination of filters to fetch logs based on multiple attributes is also implemented. Filters can be added or removed.

5. Supports full text search

6. Different colors asssigned to logs based on level. Ex: Error logs are displayed in red, success logs in green , warning logs in 
   yellow and normal logs in black.

7. Logs are ingested via an HTTP server, which runs on port 3000 by default

8. Mongodb was used as database which can efficiently handle large volumes of data and support indexing ,sharding.

Note: Since this project was made using free tier account , it has limitations on posting large data.

