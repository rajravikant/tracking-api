import { Request, Response } from 'express';
import Shipment from '../models/Shipment';
import { RequestHandler } from "express";
import createHttpError from "http-errors";


export const seedDB: RequestHandler = async (req, res, next) => {
    try {
        const shipments = await Shipment.find();
        
        await Shipment.create([
                {
                    containerId: 'LOT123',
                    currentLocation: { longitude: 51.455, latitude: 45.335 },
                    route: [{ longitude: 13.5, latitude: 25.66 }, { longitude: 51.455, latitude: 45.335 }, { longitude: 51.455, latitude: 45.335 }],
                    currentETA: '2021-09-01T00:00:00.000Z',
                    status: 'Pending'
                },
                {
                    containerId: 'LOT125',
                    currentLocation: { longitude: 51.455, latitude: 45.335 },
                    route: [{ longitude: 13.5, latitude: 25.66 }, { longitude: 51.455, latitude: 45.335 }, { longitude: 51.455, latitude: 45.335 }],
                    currentETA: '2021-09-01T00:00:00.000Z',
                    status: "In Transit"
                },
                {
                    containerId: 'LOT126',
                    currentLocation: { longitude: 51.455, latitude: 45.335 },
                    route: [{ longitude: 13.5, latitude: 25.66 }, { longitude: 51.455, latitude: 45.335 }, { longitude: 51.455, latitude: 45.335 }],
                    currentETA: '2021-09-01T00:00:00.000Z',
                    status: 'Delivered'
                },
                {
                    containerId: 'LOT127',
                    currentLocation: { longitude: 51.455, latitude: 45.335 },
                    route: [{ longitude: 13.5, latitude: 25.66 }, { longitude: 51.455, latitude: 45.335 }, { longitude: 51.455, latitude: 45.335 }],
                    currentETA: '2021-09-01T00:00:00.000Z',
                    status: 'Pending'
                },
                {
                    containerId: 'LOT128',
                    currentLocation: { longitude: 51.455, latitude: 45.335 },
                    route: [{ longitude: 13.5, latitude: 25.66 }, { longitude: 51.455, latitude: 45.335 }, { longitude: 51.455, latitude: 45.335 }],
                    currentETA: '2021-09-01T00:00:00.000Z',
                    status: 'Pending'
                },
                {
                    containerId: 'LOT129',
                    currentLocation: { longitude: 51.455, latitude: 45.335 },
                    route: [{ longitude: 13.5, latitude: 25.66 }, { longitude: 51.455, latitude: 45.335 }, { longitude: 51.455, latitude: 45.335 }],
                    currentETA: '2021-09-01T00:00:00.000Z',
                    status: 'Pending'
                }

        ])
        res.json({ message: 'Database seeded successfully' });
    }
    catch (error) {
        next(error);
    }
}



export const getShipments = async (req: Request, res: Response) => {
    try {
        const shipments = await Shipment.find();
        res.json(shipments);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getShipmentById = async (req: Request, res: Response) => {
    try {
        const shipment = await Shipment.findById(req.params.id);
        if (!shipment) return res.status(404).json({ error: 'Shipment not found' });
        res.json(shipment);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const createShipment = async (req: Request, res: Response) => {
    try {
        const newShipment = new Shipment(req.body);
        await newShipment.save();
        res.status(201).json(newShipment);
    } catch (error) {
        res.status(400).json({ error: 'Invalid shipment data' });
    }
};

export const updateShipmentLocation = async (req: Request, res: Response) => {
    try {
        const { location } = req.body;
        const shipment = await Shipment.findByIdAndUpdate(req.params.id, { currentLocation: location }, { new: true });
        if (!shipment) return res.status(404).json({ error: 'Shipment not found' });
        res.json(shipment);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getShipmentETA = async (req: Request, res: Response) => {
    try {
        const shipment = await Shipment.findById(req.params.id);
        if (!shipment) return res.status(404).json({ error: 'Shipment not found' });
        res.json({ eta: shipment.currentETA });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};