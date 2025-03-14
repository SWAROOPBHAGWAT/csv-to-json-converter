# CSV Processing API (Backend)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is a backend API that processes CSV files containing user data, inserts the data into a PostgreSQL database, calculates the age distribution of users, and returns the processed data in a nicely formatted JSON response.

## Quick Start

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd <your-repository-directory>
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

## Environment Configuration

1.  **Create a `.env` File:**
    * In the `server` directory, create a file named `.env`.

2.  **Add Database Configuration:**
    * Add the following variables to your `.env` file, replacing the placeholder values with your actual PostgreSQL credentials:

        ```
        PORT=5000
        DB_HOST=localhost
        DB_PORT=5433
        DB_USER=postgres
        DB_PASSWORD=your_password
        DB_NAME=postgres
        ```

    * **Important:**
        * **`PORT=5000`:** This sets the port number the server will listen on. Change `5000` if this port is already in use on your system.
        * **`DB_HOST=localhost`:** This is the hostname or IP address of your PostgreSQL server. Replace `localhost` if your database is on a different machine.
        * **`DB_PORT=5433`:** This is the port number your PostgreSQL server is listening on. If it's different in your setup, adjust it.
        * **`DB_USER=postgres`:** This is your PostgreSQL username. Replace `postgres` with your actual username.
        * **`DB_PASSWORD=your_password`:** This is your PostgreSQL password. **You must replace `your_password` with your actual password.** Never commit your actual password to version control.
        * **`DB_NAME=postgres`:** This is the name of your PostgreSQL database. Replace `postgres` with the name of the database you will be using.

    * **Security:** Never commit your `.env` file with sensitive information like passwords to version control.

## Usage

Send a POST request to the `/process-csv` endpoint to upload and process a CSV file:

```bash
curl -X POST http://localhost:5000/process-csv \
    -F csvFile=@"/path/to/your/file.csv"
