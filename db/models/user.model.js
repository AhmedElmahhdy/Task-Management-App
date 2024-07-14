import { Schema, model, Types } from "mongoose";

/***
 * Basic user info (name, Email , password) should be stored in the
    database.
 */

const userSchema  = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    categories: [
        {
          type: Types.ObjectId,
          ref: 'Category',
        }
      ]
});

export const User = model("User", userSchema)