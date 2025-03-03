import  mongoose from 'mongoose';
import Shipment from '../models/Shipment';

mongoose.connect('mongodb+srv://ravikantraj:9zbjp31uv1feHVwg@cluster0.noy8uoe.mongodb.net/tracking-app?retryWrites=true&w=majority&appName=Cluster0'
).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

const dummyShipments = [
  {
    containerId: 'CNT001',
    currentLocation: { type: 'Point', coordinates: [-74.006, 40.7128] }, // New York
    route: [
      { type: 'Point', coordinates: [-118.2437, 34.0522] }, // Los Angeles
      { type: 'Point', coordinates: [-87.6298, 41.8781] } // Chicago
    ],
    currentETA: '2025-03-10T12:00:00Z',
    status: 'In Transit'
  },
  {
    containerId: 'CNT002',
    currentLocation: { type: 'Point', coordinates: [2.3522, 48.8566] }, // Paris
    route: [
      { type: 'Point', coordinates: [13.405, 52.52] }, // Berlin
      { type: 'Point', coordinates: [12.4964, 41.9028] } // Rome
    ],
    currentETA: '2025-03-15T15:30:00Z',
    status: 'Pending'
  },
  
];



export const seedDatabase = async () => {
  try {
    await Shipment.deleteMany(); // Clear existing data
    await Shipment.insertMany(dummyShipments);
    console.log('Dummy shipments inserted successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};


