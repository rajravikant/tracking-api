# Cargo Shipment Tracker - Backend API

## 🚀 Project Overview
This **Cargo Shipment Tracker Backend** is built with **Node.js, Express, and MongoDB**. It provides RESTful APIs for managing shipments .
Link for the front end api - https://github.com/rajravikant/client_tracking_app
---

## 📌 Prerequisites
Ensure you have the following installed:
- **Node.js** (>= 14.x)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn**

---

## 🖥 Backend Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/rajravikant/tracking-api.git
cd cargo-shipment-tracker-backend
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Configure Environment Variables**
Create a `.env` file:
```sh
touch .env
```
Add the following variables:
```
PORT=5000
MONGO_URI= <mongo db connection string>
```

### **5️⃣ Run the Backend Server**
```sh
npm start
```
The API should be running on `http://localhost:8080/`

---

## 📌 API Endpoints

### **🚀 Shipments API**

#### **1️⃣ Create a New Shipment**
```http
POST /api/shipment
```
**Request Body:**
```json
{
    "containerId": "CNT001",
    "currentLocation": {
        "type": "Point",
        "coordinates": [77.50930350311285,19.246900186698284]
    },
    "route": [{"type": "Point","coordinates": [77.50930350311285,19.246900186698284]}],
    "currentETA": "2025-03-08T19:12",
    "status": "Delivered",
    "assignedDriver": "Prats",
    "vehicleDetails": {
        "vehicleNumber": "JG-4556",
        "vehicleType": "Train"
    }
}
```

#### **2️⃣ Get All Shipments**
```http
GET /api/shipments
```

#### **3️⃣ Get a Shipment by ID**
```http
GET /api/shipments/:id
```

#### **4️⃣ Update a Shipment**
```http
PUT /api/shipments/:id
```
**Request Body:**
```json
  {
      type: 'Point',
      coordinates: [longitude,latitude]
    }
```

---

## 🔥 Database Seeding
To seed MongoDB with dummy shipments:
```sh
http://localhost:8080/api/seed
```

---

## 🤝 Contributing
Feel free to submit pull requests or report issues.

---

