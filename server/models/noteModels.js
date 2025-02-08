import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to User model
      required: true,
   },
   project: {
      type: String,
      required: true,
   },
   task: {
      type: String,
      required: true,
      unique: true,
   },
   taskDisc: {
      type: String,
      required: true,
   }, 
   dueDate: {
      type: Date,
      required: true,
   },
   document: {
      type: String, // Change file to String (we'll handle file uploads later)
   }
}, { timestamps: true });

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;
