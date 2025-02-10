import express from "express";
import Notes from "../models/noteModels.js";

const router = express.Router();

//  Create a new note (User ID comes from frontend)
router.post("/create", async (req, res) => {
  try {
    const {userId, project, task, taskDisc, dueDate, document } = req.body;

    if (!userId || !project || !task || !taskDisc || !dueDate) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    const newNote = new Notes({
      userId,
      project,
      task,
      taskDisc,
      dueDate,
      document,
    });

    await newNote.save();
    res.status(201).json({ success: true, message: "Note created successfully!", note: newNote });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Get all notes for a specific user (User ID comes from frontend)
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const notes = await Notes.find({ userId });
    res.json({ success: true,message:"Nots fetch Succeefullly",notes: notes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Get a single note (User ID from frontend)
router.get("/:userId/:id", async (req, res) => {
  try {
    const { userId, id } = req.params;
    const note = await Notes.findOne({ _id: id, userId });

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found!" });
    }
    res.json({ success: true, note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Update a note (User ID from frontend)
router.put("/update/:id", async (req, res) => {
  try {
    const { userId, project, task, taskDisc, dueDate, document } = req.body;

    const updatedNote = await Notes.findOneAndUpdate(
      { _id: req.params.id, userId },
      { project, task, taskDisc, dueDate, document },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ success: false, message: "Note not found!" });
    }

    res.json({ success: true, message: "Note updated successfully!", note: updatedNote });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Delete a note (User ID from frontend)
router.delete("/delete/:id", async (req, res) => {
  try {
    const { userId } = req.body; // User ID should be sent in request body
    const deletedNote = await Notes.findOneAndDelete({ _id: req.params.id, userId });

    if (!deletedNote) {
      return res.status(404).json({ success: false, message: "Note not found!" });
    }
    res.json({ success: true, message: "Note deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
