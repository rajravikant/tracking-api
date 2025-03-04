import { Request, Response } from "express";
import Shipment from "../models/Shipment";
import { RequestHandler } from "express";
import createHttpError from "http-errors";

// {
//   containerId: "CNT001",
//   status: "Pending",
//   currentETA: "2025-03-10T12:00:00Z",
//   currentLocation: {
//     type: "Point",
//     coordinates: [-73.856077, 40.848447]
//   },
//   route : [{
//     type: "Point",
//     coordinates: [-73.856077, 40.848447]
//   },
//   {
//     type: "Point",
//     coordinates: [-73.856077, 40.848447]
//   }]
// },
const dummyShipments = [
  {
    "containerId": "CNT001",
    "status": "Pending",
    "currentETA": "2025-03-22T10:15:00Z",
    "currentLocation": {
      "type": "Point",
      "coordinates": [28.7041, 77.1025]  // Delhi
    },
    "route": [
      { "type": "Point", "coordinates": [19.0760, 72.8777] },  // Mumbai
      { "type": "Point", "coordinates": [13.0827, 80.2707] }   // Chennai
    ]
  },
  {
    "containerId": "CNT002",
    "status": "In Transit",
    "currentETA": "2025-03-23T14:30:00Z",
    "currentLocation": {
      "type": "Point",
      "coordinates": [22.5726, 88.3639]  // Kolkata
    },
    "route": [
      { "type": "Point", "coordinates": [26.9124, 75.7873] },  // Jaipur
      { "type": "Point", "coordinates": [23.0225, 72.5714] },  // Ahmedabad
      { "type": "Point", "coordinates": [21.1702, 72.8311] }   // Surat
    ]
  },
  {
    "containerId": "CNT003",
    "status": "Delivered",
    "currentETA": "2025-03-20T09:00:00Z",
    "currentLocation": {
      "type": "Point",
      "coordinates": [12.9716, 77.5946]  // Bangalore
    },
    "route": [
      { "type": "Point", "coordinates": [17.3850, 78.4867] },  // Hyderabad
      { "type": "Point", "coordinates": [15.3173, 75.7139] },  // Hubli
      { "type": "Point", "coordinates": [11.0168, 76.9558] },  // Coimbatore
      { "type": "Point", "coordinates": [9.9312, 76.2673] }    // Kochi
    ]
  },
  {
    "containerId": "CNT004",
    "status": "Pending",
    "currentETA": "2025-03-25T16:45:00Z",
    "currentLocation": {
      "type": "Point",
      "coordinates": [19.0760, 72.8777]  // Mumbai
    },
    "route": [
      { "type": "Point", "coordinates": [15.2993, 74.1240] },  // Panaji
      { "type": "Point", "coordinates": [12.2958, 76.6394] }   // Mysore
    ]
  },
  {
    "containerId": "CNT005",
    "status": "In Transit",
    "currentETA": "2025-03-21T11:20:00Z",
    "currentLocation": {
      "type": "Point",
      "coordinates": [23.2599, 77.4126]  // Bhopal
    },
    "route": [
      { "type": "Point", "coordinates": [25.4358, 81.8463] },  // Prayagraj
      { "type": "Point", "coordinates": [27.1767, 78.0081] },  // Agra
      { "type": "Point", "coordinates": [28.4089, 77.3178] }   // Faridabad
    ]
  },
  {
    "containerId": "CNT006",
    "status": "Delivered",
    "currentETA": "2025-03-19T13:50:00Z",
    "currentLocation": {
      "type": "Point",
      "coordinates": [26.8467, 80.9462]  // Lucknow
    },
    "route": [
      { "type": "Point", "coordinates": [25.3176, 82.9739] },  // Varanasi
      { "type": "Point", "coordinates": [22.7196, 75.8577] },  // Indore
      { "type": "Point", "coordinates": [21.2514, 81.6296] }   // Raipur
    ]
  },
  {
    "containerId": "CNT007",
    "status": "Pending",
    "currentETA": "2025-03-24T08:10:00Z",
    "currentLocation": {
      "type": "Point",
      "coordinates": [17.6868, 83.2185]  // Visakhapatnam
    },
    "route": [
      { "type": "Point", "coordinates": [15.8281, 78.0373] },  // Kadapa
      { "type": "Point", "coordinates": [13.6288, 79.4192] }   // Tirupati
    ]
  },
  {
    "containerId": "CNT008",
    "status": "In Transit",
    "currentETA": "2025-03-26T15:00:00Z",
    "currentLocation": {
      "type": "Point",
      "coordinates": [11.9416, 79.8083]  // Puducherry
    },
    "route": [
      { "type": "Point", "coordinates": [10.8505, 76.2711] },  // Palakkad
      { "type": "Point", "coordinates": [9.9252, 78.1198] },   // Madurai
      { "type": "Point", "coordinates": [8.0883, 77.5385] }    // Kanyakumari
    ]
  },
  {
    "containerId": "CNT009",
    "status": "Delivered",
    "currentETA": "2025-03-18T17:30:00Z",
    "currentLocation": {
      "type": "Point",
      "coordinates": [22.3072, 73.1812]  // Vadodara
    },
    "route": [
      { "type": "Point", "coordinates": [23.2156, 72.6369] },  // Gandhinagar
      { "type": "Point", "coordinates": [24.5854, 73.7125] }   // Udaipur
    ]
  },
]
 



export const seedDB: RequestHandler = async (req, res, next) => {
  try {
    const shipments = await Shipment.find();

    if (shipments.length > 0) {
      // delele all the detials in the database
      await Shipment.deleteMany();
    }
    await Shipment.insertMany(dummyShipments);
    res.json({ message: "Database seeded successfully" });
  } catch (error) {
    next(error);
  }
};

export const getShipments = async (req: Request, res: Response) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getShipmentById = async (req: Request, res: Response) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) return res.status(404).json({ error: "Shipment not found" });
    res.json(shipment);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const createShipment = async (req: Request, res: Response) => {
  try {
    const newShipment = new Shipment(req.body);
    await newShipment.save();
    res.status(201).json(newShipment);
  } catch (error) {
    res.status(400).json({ error: "Invalid shipment data" });
  }
};

export const updateShipmentLocation = async (req: Request, res: Response) => {
  try {
    const { location } = req.body;
    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      { currentLocation: location },
      { new: true }
    );
    if (!shipment) return res.status(404).json({ error: "Shipment not found" });
    res.json(shipment);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getShipmentETA = async (req: Request, res: Response) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) return res.status(404).json({ error: "Shipment not found" });
    res.json({ eta: shipment.currentETA });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
