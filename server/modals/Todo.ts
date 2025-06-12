import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  name: string;
  shortDescription: string;
  dateTime: Date;
  done: boolean;
}

const TodoSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
},
  {
    timestamps: true, 
  
});

export default mongoose.model<ITodo>("Todo", TodoSchema);
