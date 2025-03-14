# CSV Processing API (Backend)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is a backend API that processes CSV files containing user data, inserts the data into a PostgreSQL database, calculates the age distribution of users, and returns the processed data in a nicely formatted JSON response.

## Quick Start

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd <your-repository-directory>/server
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the `server` directory with your database configuration:

    ```
    PORT=5000
    DB_HOST=localhost
    DB_PORT=5433
    DB_USER=postgres
    DB_PASSWORD=your_password
    DB_NAME=postgres
    ```

4.  **Create the PostgreSQL database and `users` table:**

    ```sql
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        age INTEGER,
        address JSONB,
        additional_info JSONB
    );
    ```

5.  **Start the server:**

    ```bash
    node src/server.js
    ```

## Usage

Send a POST request to the `/process-csv` endpoint to upload and process a CSV file:

```bash
curl -X POST http://localhost:5000/process-csv \
  -F csvFile=@"/path/to/your/file.csv"
