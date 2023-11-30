import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  level: { 
    type: String, 
    required: true
},
  message: { type: String, 
    required: true 
},
  resourceId: { type: String,
     required: true 
},
  timestamp: { type: Date, 
    default: Date.now 
},
  traceId: { type: String },
  spanId: { type: String },
  commit: { type: String },
  metadata: {
    parentResourceId: { type: String },
  }
},{timestamps:true});

const Log = mongoose.model('Log', logSchema);
 
export default Log;
