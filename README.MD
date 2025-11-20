# Coupon Management System

A simple Node.js + Express backend service for creating and evaluating e-commerce coupons. This project fulfills the **Coupon Management Assignment** requirements from Anshumat Foundation.

---

## 🚀 Project Overview
This service allows:
- Creating coupons with rules and eligibility conditions
- Finding the **best applicable coupon** for a user and their cart
- In-memory storage (no database needed)

---

## 🛠 Tech Stack
- **Node.js** (v18+ recommended)
- **Express.js**
- **UUID** for unique IDs (if needed)

---

## 📁 Folder Structure
```
coupon-system/
├── server.js
├── package.json
└── README.md
```

---

## ⚙️ How to Run the Project

### 1. Clone the Repository
```
git clone <your-repo-url>
cd coupon-system
```

### 2. Install Dependencies
```
npm install
```

### 3. Start the Server
```
npm start
```
Server will start at:
```
http://localhost:3000
```

---

## 🧪 API Documentation

### 1️⃣ Create Coupon API
**Endpoint:** `POST /coupons`

**Body Example:**
```json
{
  "code": "WELCOME100",
  "description": "Flat 100 Off",
  "discountType": "FLAT",
  "discountValue": 100,
  "startDate": "2025-01-01",
  "endDate": "2025-12-31",
  "eligibility": {
    "allowedUserTiers": ["NEW", "REGULAR"]
  }
}
```

**Success Response:**
```json
{
  "message": "Coupon created",
  "coupon": { ... }
}
```

---

### 2️⃣ Best Coupon API
**Endpoint:** `POST /best-coupon`

**Body Example:**
```json
{
  "user": {
    "userTier": "NEW",
    "country": "IN",
    "lifetimeSpend": 1000,
    "ordersPlaced": 1
  },
  "cart": {
    "items": [
      {
        "productId": "p1",
        "category": "electronics",
        "unitPrice": 500,
        "quantity": 1
      }
    ]
  }
}
```

**Success Response:**
```json
{
  "c": { ...coupon details... },
  "d": 50
}
```
`d` = calculated discount

---

## 🧠 Best Coupon Selection Logic
1. Filter coupons by:
   - Valid date range
   - Eligibility rules
2. Calculate discount amount:
   - FLAT → fixed amount
   - PERCENT → percentage of cart value
3. Select best coupon by:
   1. Highest discount
   2. Earliest end date
   3. Alphabetically smaller code

---

## ❗ Notes for Reviewer
- Fully in-memory implementation (no database)
- Clean and simple API design
- Easy to extend eligibility rules

---

## 🤖 AI Usage
- ChatGPT used to assist with code structure, README formatting, and test cases
- Prompts included guidance for Express setup and eligibility logic design

---

## 🏁 Submission Details
- **Assignment Name:** Coupon Management
- **Tech Stack:** Node.js, Express.js
- **Live Demo:** <add your Render/Railway link here>
- **GitHub Repo:** <your repo URL>

---

## 👨‍💻 Developer
**Aadi** — Software Developer Intern Candidate
