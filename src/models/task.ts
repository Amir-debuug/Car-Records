import { Document, Schema, Model, model } from "mongoose";

export interface ITask extends Document {
  userId: string;
  name: string;
  make: string;
  color: string;
  code?: string;
  createdAt?: Date;
}

const taskSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  make: {
    type: String,
    enum: ["AUDI", "BMW", "VAUXHAL", "MERCEDES", "PEUGEOT", "RENAULT"],
    required: true
  },
  color: {
    type: String,
    enum: ["BLUE", "RED", "BLACK", "ORANGE"],
    required:true
  },
  code: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Task: Model<ITask> = model<ITask>("Task", taskSchema);
