import mongoose,{Schema,InferSchemaType,model} from "mongoose";

const shipmentSchema = new mongoose.Schema({
  containerId: { type: String, required: true, unique: true },
  currentLocation: {
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }
  },
  route: [
    {
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true }
    }
  ],
  currentETA: { type: String },
  status: { type: String, enum: ['Pending', 'In Transit', 'Delivered'], default: 'Pending' }
  },
{timestamps:true});

export type Shipment = InferSchemaType<typeof shipmentSchema>



export default model<Shipment>("Shipment", shipmentSchema);

