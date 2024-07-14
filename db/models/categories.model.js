import { Schema,model , Types } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tasks: [
     {
      type: Types.ObjectId,
      ref: 'Task',
        }
  ]
});


export const Category = model("Category", categorySchema)