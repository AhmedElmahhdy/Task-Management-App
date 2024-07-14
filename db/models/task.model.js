import { Schema, model, Types } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
      },
      type: {
        type: String,
        enum: ['text', 'list'],
        required: true,
      },
      textBody: {
        type: String,
        trim: true,
        default: ''
      },
      listItems: [{
        type: Types.ObjectId,
        ref: 'ListItem'
      }],
      visibility: {
        type: String,
        enum: ['shared', 'private'],
        default: 'private',
      },
      creator: {
        type:Types.ObjectId,
        ref: 'User',
        required: true,
      },
      category: { 
        type:Types.ObjectId,
        ref: 'Category',
        required: true,
      }
    });
    
    // Define the ListItem schema
    const listItemSchema = new Schema({
      textBody: {
        type: String,
        required: true,
        trim: true,
      },
      task: {
        type: Types.ObjectId,
        ref: 'Task',
        required: true,
      }
    });


export const Task = model("Task", taskSchema)
export const ListItem = model("ListItem", listItemSchema)