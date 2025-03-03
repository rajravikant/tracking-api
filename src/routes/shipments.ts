import express from "express";
const router = express.Router();

import * as shipmentController from "../controllers/shipment";


router.get("/seed",shipmentController.seedDB)
router.get("/shipments", shipmentController.getShipments);
router.get("/shipment/:id", shipmentController.getShipmentById);
router.post("/shipment", shipmentController.createShipment);
router.post(
  "/shipment/:id/update-location",
  shipmentController.updateShipmentLocation
);
router.get("/shipment/:id/eta", shipmentController.getShipmentETA);

export default router;
