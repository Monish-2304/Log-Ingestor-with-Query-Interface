import express from "express";
import Log from '../models/logModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
      const logData = req.body; 
  
      // Create a new log using the Log model
      const newLog = new Log(logData);
  
      // Saving log data to MongoDB
      await newLog.save();
  
      res.status(200).json({ message: 'Log ingested successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // route for fetching logs
  router.get('/', async (req, res) => {
    try {
      const logs = await Log.find(); // Fetch all logs from MongoDB
  
      res.status(200).json(logs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  export default router;