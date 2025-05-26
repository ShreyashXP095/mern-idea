import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // Sort by creation date, newest first
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getNoteById(req, res) {
    try {
        const foundNote = await Note.findById(req.params.id);
        if(!foundNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(foundNote);
    } catch (error) {
        
        console.log("Error in getNoteById:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title: title, content: content });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.log("Error in createNote:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updateNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(updateNote);
  } catch (error) {
    console.log("Error in updateNote:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.log("Error in deleteNote:", error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
};
