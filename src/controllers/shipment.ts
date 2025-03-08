import Shipment from "../models/Shipment";
import { RequestHandler } from "express";
import createHttpError from "http-errors";



const dummyShipments = [
  {
    "containerId": "CNT001",
    "currentLocation": {
        "type": "Point",
        "coordinates": [
            77.50930350311285,
            19.246900186698284
        ]
    },
    "route": [
        {
            "type": "Point",
            "coordinates": [
                77.50930350311285,
                19.246900186698284
            ],
        },
        {
            "type": "Point",
            "coordinates": [
                79.5327814219976,
                17.83257182361373
            ],
        }
    ],
    "currentETA": "2025-03-08T19:12",
    "status": "Delivered",
    "assignedDriver": "Prats",
    "vehicleDetails": {
        "vehicleNumber": "JG-4556",
        "vehicleType": "Train"
    }
},
{
  "containerId": "CNT002",
  "currentLocation": {
      "type": "Point",
      "coordinates": [
          77.50930350311278,
          19.246900186698247
      ]
  },
  "route": [
      {
          "type": "Point",
          "coordinates": [
              77.50930350311285,
              19.246900186698284
          ],
      }
  ],
  "currentETA": "2025-03-09T19:12",
  "status": "In Transit",
  "assignedDriver": "Ayush Singh",
  "vehicleDetails": {
      "vehicleNumber": "JG-4896",
      "vehicleType": "Ship"
  }
}
]



export const seedDB: RequestHandler = async (req, res, next) => {
  try {
    const shipments = await Shipment.find();

    if (shipments.length > 0) {
      await Shipment.deleteMany();
    }
    await Shipment.insertMany(dummyShipments);
    res.json({ message: "Database seeded successfully" });
  } catch (error) {
    next(error);
  }
};

export const getShipments:RequestHandler = async (req,res,next) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (error) {
    next(error)
  }
};

export const getShipmentById:RequestHandler = async (req,res,next) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) return res.status(404).json({ error: "Shipment not found" });
    res.json(shipment);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const createShipment:RequestHandler = async (req,res,next) => {
  try {
    const newShipment = new Shipment(req.body);
    await newShipment.save();
    res.status(201).json(newShipment);
  } catch (error) {
    next(error)
  }
};




export const updateShipmentLocation:RequestHandler = async (req,res,next) => {
  try {
    const { location } = req.body;
    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      { currentLocation : location },
      { new: true }
    );
    if (!shipment) throw createHttpError(404,"Shipment not found")
    res.json(shipment);
  } catch (error) {
    next(error)
  }
};

export const getShipmentETA:RequestHandler = async (req,res,next) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) throw createHttpError(404,"Shipment not found")
    res.json({ eta: shipment.currentETA });
  } catch (error) {
    next(error)
  }
};
