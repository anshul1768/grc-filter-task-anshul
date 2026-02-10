# GRC Risk Assessment & Heatmap Dashboard

## 📌 Project Overview

This project is a **full-stack GRC (Governance, Risk, and Compliance) Risk Assessment & Heatmap Dashboard** built using **Node.js (Express) + MongoDB** for the backend and **React (Vite)** for the frontend.

The application implements a **standard Likelihood × Impact risk matrix**, a core concept used in real-world GRC frameworks such as **ISO/IEC 27001** and **NIST SP 800-30**.

Users can assess risks, automatically compute risk scores and risk levels, store them persistently in MongoDB, and visualize risks using a **5×5 heatmap dashboard**.

---
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/anshul1768/grc-filter-task-anshul.git
cd grc-filter-task-anshul
⚙️ Backend Setup (Node.js + MongoDB)
2️⃣ Move to Backend Folder
cd backend

3️⃣ Install Dependencies
npm install

4️⃣ Environment Variables

Create a .env file in the backend folder:

PORT=8000
MONGO_URI=mongodb://localhost:27017/grc-risk-db


⚠️ .env file is ignored using .gitignore and must be created manually after cloning.

5️⃣ Start Backend Server
npm start


Backend will run at:

http://localhost:8000

🎨 Frontend Setup (React + Vite)
6️⃣ Open New Terminal & Move to Frontend
cd frontend

7️⃣ Install Frontend Dependencies
npm install

8️⃣ Start Frontend Server
npm run dev


Frontend will run at:

http://localhost:5173

✅ Final Result

Backend API running on port 8000

Frontend UI running on port 5173

Risks can be added, stored in MongoDB, and visualized on dashboard & heatmap


## 🎯 Purpose of the Application

Organizations face risks like:
- Data breaches
- Unauthorized access
- Operational disruptions
- Compliance violations

To prioritize these risks, GRC teams follow a **risk matrix approach**:

1. Estimate **Likelihood** (1–5)
2. Estimate **Impact** (1–5)
3. Compute **Risk Score = Likelihood × Impact**
4. Map score to **Risk Level** (Low / Medium / High / Critical)
5. Visualize risks on a **heatmap** for quick decision-making

This application is a simplified but realistic implementation of this workflow.

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- CORS

### Frontend
- React.js (Vite)
- React Hooks (useState, useEffect)
- Custom Heatmap / Chart.js
- CSS / Tailwind / custom styling

---

## 📁 Folder Structure

grc-filter-task-anshul/
│
├── backend/
│ ├── node_modules/
│ ├── src/
│ │ ├── controllers/
│ │ │ └── risk.controller.js
│ │ ├── db/
│ │ │ └── connectDB.js
│ │ ├── model/
│ │ │ └── risk.model.js
│ │ └── routes/
│ │ └── risk.route.js
│ ├── .env
│ ├── .gitignore
│ ├── app.js
│ ├── package.json
│ └── package-lock.json
│
├── frontend/
│ ├── node_modules/
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ │ ├── Dashboard.jsx
│ │ │ ├── HeatMap.jsx
│ │ │ └── RiskForm.jsx
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── package.json
│ └── vite.config.js
│
└── README.md



---

## 🔐 Environment Variables

Sensitive configuration is handled using environment variables.

### Backend `.env`
```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/grc-risk-db

⚙️ Backend Setup
Install Dependencies
cd backend
npm install

Run Backend Server
npm start


Backend runs at:

http://localhost:8000

📦 Database Design (MongoDB)

Database: MongoDB

Connection handled in:

src/db/connectDB.js


Schema defined in:

src/model/risk.model.js

Risk Schema (Mongoose)
{
  asset: String,
  threat: String,
  likelihood: Number,
  impact: Number,
  score: Number,
  level: String
}

🔌 Backend API Endpoints
POST /assess-risk

Creates a new risk after validation and calculation.

Request Body

{
  "asset": "Customer Database",
  "threat": "Unauthorized Access",
  "likelihood": 3,
  "impact": 4
}


Validation Rules

Likelihood and Impact must be integers between 1 and 5

Invalid input returns HTTP 400

Risk Calculation Logic

score = likelihood × impact

Score Range	Risk Level
1–5	Low
6–12	Medium
13–18	High
19–25	Critical

Response Example

{
  "_id": "64fa9c...",
  "asset": "Customer Database",
  "threat": "Unauthorized Access",
  "likelihood": 3,
  "impact": 4,
  "score": 12,
  "level": "Medium"
}

GET /risks

Returns all stored risks

Supports optional filtering:

/risks?level=High

🎨 Frontend Functionality
Risk Input Form

Asset and Threat text inputs

Likelihood & Impact sliders (1–5)

Real-time preview:

Preview: Score = 12 | Level = Medium


Submit sends POST request to backend

Dashboard

Risk table with sorting and filtering

Summary cards:

Total risks

High + Critical risks

Average risk score

Heatmap (5×5 Grid)

Rows → Likelihood (1–5)

Columns → Impact (1–5)

Each cell shows number of risks

Color-coded:

Green → Low

Yellow → Medium

Orange → High

Red → Critical

🧪 Edge Cases Handled

Empty database → empty dashboard

Duplicate risks allowed

Invalid likelihood/impact blocked

Responsive UI

🛡 GRC Context

This project demonstrates practical understanding of:

Risk scoring

Risk prioritization

Heatmap-based decision making

GRC-aligned workflows used in enterprise tools

🚀 Future Enhancements

CSV export

Compliance mapping (ISO / NIST)

Authentication & RBAC

Cloud deployment

Unit tests

👨‍💻 Author

Anshul Singh
Computer Engineering Student
Full-Stack Developer (Node.js, React, MongoDB)

## 🚀 Clone & Run the Project Locally

