# Loan Management System (LAMF)

Frontend deployed link : https://loan-management-system-mu.vercel.app/
Backend deployed link : https://loan-management-system-1-j7hn.onrender.com/

## Overview

This project is a **full-stack Loan Management System (LMS)** built for an NBFC that offers
**Loans Against Mutual Funds (LAMF)**.

The system allows:
- Defining loan products
- Creating and tracking loan applications
- Managing mutual fund collaterals
- Tracking ongoing loans
- External fintech companies to integrate via APIs

The project is designed with an **API-first architecture** and mirrors real-world NBFC LMS workflows.

---

## Tech Stack Used

### Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL (Aiven Managed)
- dotenv

### Frontend
- React.js
- Axios

### Infrastructure
- Aiven (Managed MySQL)
- Vercel and Render (Deployment)

---
## Architecture
Frontend (React)
    |
    | REST APIs (Axios)
    v
Backend (Node.js + Express)
    |
    | Sequelize ORM
    v
MySQL Database (Aiven Managed)

External fintech partners can directly call backend APIs
(e.g. `POST /api/loan-applications`) without using the frontend.

---

## Database Schema

### Tables Used

### 1. loan_products

| Column | Type | Description |
|------|------|-------------|
| id | INT (PK) | Unique loan product ID |
| name | VARCHAR | Product name |
| interest_rate | FLOAT | Interest rate (%) |
| max_ltv_percentage | FLOAT | Maximum allowed LTV |
| min_loan_amount | DECIMAL | Minimum loan amount |
| max_loan_amount | DECIMAL | Maximum loan amount |
| tenure_months | INT | Loan tenure |
| createdAt | DATETIME | Created time |
| updatedAt | DATETIME | Updated time |

---

### 2. loan_applications

| Column | Type | Description |
|------|------|-------------|
| id | INT (PK) | Application ID |
| applicant_name | VARCHAR | Applicant name |
| email | VARCHAR | Applicant email |
| phone | VARCHAR | Applicant phone |
| requested_amount | DECIMAL | Requested amount |
| status | ENUM | PENDING / APPROVED / REJECTED |
| source | VARCHAR | INTERNAL / FINTECH |
| LoanProductId | INT (FK) | Linked product |
| createdAt | DATETIME | Created time |
| updatedAt | DATETIME | Updated time |

---

### 3. collaterals

| Column | Type | Description |
|------|------|-------------|
| id | INT (PK) | Collateral ID |
| fund_name | VARCHAR | Mutual fund name |
| isin | VARCHAR | Fund ISIN |
| units_pledged | FLOAT | Units pledged |
| nav | FLOAT | NAV per unit |
| value | DECIMAL | Total value |
| LoanApplicationId | INT (FK) | Linked application |
| createdAt | DATETIME | Created time |
| updatedAt | DATETIME | Updated time |

---

### 4. loans

| Column | Type | Description |
|------|------|-------------|
| id | INT (PK) | Loan ID |
| sanctioned_amount | DECIMAL | Approved amount |
| interest_rate | FLOAT | Interest rate |
| outstanding_amount | DECIMAL | Balance amount |
| status | ENUM | ONGOING / CLOSED |
| LoanApplicationId | INT (FK) | Linked application |
| createdAt | DATETIME | Created time |
| updatedAt | DATETIME | Updated time |

---

### 5. api_clients

| Column | Type | Description |
|------|------|-------------|
| id | INT (PK) | Client ID |
| name | VARCHAR | Fintech name |
| api_key | VARCHAR | API key |
| is_active | BOOLEAN | Access enabled |
| createdAt | DATETIME | Created time |
| updatedAt | DATETIME | Updated time |

---

### Relationships

LoanProduct 1 → M LoanApplication
LoanApplication 1 → 1 Loan
LoanApplication 1 → M Collateral

---

## Seed Data

Seed data is used to initialize the system with predictable test data.

### Seeded Entities
- LoanProduct
- ApiClient
- LoanApplication
- Collateral
- Loan

### Seed Script
src/seed/testInsert.js


Run:
```bash
node src/seed/testInsert.js

```
This inserts fake but realistic data into the real MySQL database.

-----

## API Endpoints & Example Responses
Loan Products

### GET /api/loan-products

Response:

[
  {
    "id": 1,
    "name": "LAMF Standard",
    "interest_rate": 10.5,
    "max_ltv_percentage": 50,
    "tenure_months": 12
  }
]

### Create Loan Application

POST /api/loan-applications

Request:

{
  "applicant_name": "John Doe",
  "email": "john@example.com",
  "phone": "9999999999",
  "requested_amount": 300000,
  "LoanProductId": 1
}


Response:

{
  "id": 1,
  "status": "PENDING",
  "requested_amount": 300000
}

### Get Loan Applications

GET /api/loan-applications

Response:

[
  {
    "id": 1,
    "applicant_name": "John Doe",
    "requested_amount": 300000,
    "status": "PENDING"
  }
]

### Collaterals

GET /api/collaterals

Response:

[
  {
    "fund_name": "Axis Bluechip Fund",
    "isin": "INF846K01DP8",
    "units_pledged": 100,
    "nav": 45.5,
    "value": 4550
  }
]

### Ongoing Loans

GET /api/loans

Response:

[
  {
    "sanctioned_amount": 250000,
    "interest_rate": 10.5,
    "status": "ONGOING"
  }
]

## Setup & Run Instructions
Backend
```git clone <https://github.com/kushagra2304/loan-management-system>```
```cd backend```
```npm install```


Create .env file:

PORT=5000
DB_HOST=<aiven-host>
DB_PORT=<aiven-port>
DB_NAME=<db-name>
DB_USER=<db-user>
DB_PASSWORD=<db-password>


Run backend:

npm run dev

Frontend
```cd frontend```
```npm install```
```npm start```


Frontend runs at:

http://localhost:3000


