# CSV Processing API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This API processes CSV files containing user data, inserts the data into a PostgreSQL database, calculates the age distribution of users, and returns the processed data in a formatted JSON response.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Endpoint](#api-endpoint)
- [Usage](#usage)
- [Example CSV File](#example-csv-file)
- [Example API Request](#example-api-request)
- [Example API Response](#example-api-response)
- [Logging](#logging)
- [Error Handling](#error-handling)
- [Security](#security)
- [Graceful Shutdown](#graceful-shutdown)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- Processes CSV files containing user data.
- Inserts user data into a PostgreSQL database.
- Calculates the age distribution of users.
- Returns processed data in a nicely formatted JSON response.
- Robust error handling and logging.
- Graceful shutdown for server and database connections.
- Secure handling of database credentials (local development only).

## Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)
- PostgreSQL database
- curl (for testing API endpoints)

## Setup

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd <your-repository-directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the project root directory and add the following environment variables (see [Environment Variables](#environment-variables) for details):

    ```
    PORT=5000
    DB_HOST=localhost
    DB_PORT=5433
    DB_USER=postgres
    DB_PASSWORD=your_password
    DB_NAME=postgres
    CSV_FILE_PATH=./uploads/data.csv
    ```

4.  **Create the necessary database and tables** (see [Database Setup](#database-setup)).

5.  **Place the CSV file** in the `./uploads` directory (or specify a different path in the `.env` file).

## Environment Variables

-   `PORT`: The port on which the server will listen (default: 5000).
-   `DB_HOST`: The PostgreSQL database host (default: localhost).
-   `DB_PORT`: The PostgreSQL database port (default: 5433).
-   `DB_USER`: The PostgreSQL database user.
-   `DB_PASSWORD`: The PostgreSQL database password.
-   `DB_NAME`: The PostgreSQL database name.
-   `CSV_FILE_PATH`: The path to the CSV file to be processed.

**Important:** For production environments, database credentials should never be stored in plain text files. Instead, use environment variables or a secrets management service like AWS Secrets Manager or Azure Key Vault.

## Database Setup

1.  **Create a PostgreSQL database** named `postgres` (or as specified in your `.env` file).

2.  **Create the `users` table** with the following schema:

    ```sql
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        age INTEGER,
        address JSONB,
        additional_info JSONB
    );
    ```

## Running the Application

1.  **Start the server:**

    ```bash
    node src/server.js
    ```

2.  The server will start listening on the specified port.

## API Endpoint

-   **POST /process-csv**

## Usage

To process the CSV file and get the results, send a POST request to the `/process-csv` endpoint using `curl` or a similar tool.

## Example CSV File

```csv
first_name,last_name,age,address_line1,address_line2,address_city,address_state,gender
John,Smith,32,123 Maple Street,Apt 4B,Springfield,Illinois,Male
Emma,Johnson,45,456 Oak Avenue,Suite 201,Riverdale,New York,Female
Rohit,Prasad,35,A - 563 Rakshak Society,New Pune Road,Pune,Maharashtra,male
