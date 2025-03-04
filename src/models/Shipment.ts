import mongoose,{InferSchemaType,model} from "mongoose";

const shipmentSchema = new mongoose.Schema({
  containerId: { type: String, required: true, unique: true },
  currentLocation: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true } 
  },
  route: {
    type : [
      {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true },
      }
    ],
    default : []
  },
  
  currentETA: { type: String },
  status: { type: String, enum: ['Pending', 'In Transit', 'Delivered'], default: 'Pending' }
  },
{timestamps:true});

shipmentSchema.index({currentLocation : '2dsphere'});
shipmentSchema.index({route : '2dsphere'})

export type Shipment = InferSchemaType<typeof shipmentSchema>


export default model<Shipment>("Shipment", shipmentSchema);

