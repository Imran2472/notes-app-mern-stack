import Notes from "../Models/Notes.Model.js";

export const CreatNotes = async (req, res) => {
  try {
    const { title, description } = req.body;
    const NewNotes = new Notes({
      title,
      description,
      userId: req.user._id,
    });
    const savedNotes = await NewNotes.save();
    res.json({
      success: true,
      savedNotes,
      message: "Notes saved successfully",
    });
  } catch (error) {
    console.log("Error in CreateNotes", error);
    res.json({ message: error.message });
  }
};

export const GetNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    const notes = await Notes.find({ userId });
    res.json({ notes });
  } catch (error) {
    console.log("Error in GetNotes", error);
    res.json({ message: error.message });
  }
};

export const GetNotesById = async (req, res) => {
  try {
    const NotesId = req.params.id;
    const note = await Notes.findById(NotesId);
    if (!note) {
      return res.json({ message: "Note not found" });
    }
    res.json({ note });
  } catch (error) {
    console.log("Error in GetNotesById", error);
    res.json({ message: error.message });
  }
};

export const UpdateNotesById = async (req, res) => {
  try {
    const notesId = req.params.id;
    const updatedNotes = await Notes.findByIdAndUpdate(notesId, req.body, {
      new: true,
    });
    if (!updatedNotes) {
      return res.json({ message: "Note not found" });
    }
    res.json({
      success: true,
      message: "Note updated successfully",
      updatedNotes,
    });
  } catch (error) {
    console.log("Error in UpdateNotesById", error);
    res.json({ message: error.message });
  }
};

export const DeleteNotes = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedNotes = await Notes.findByIdAndDelete(id);
    if (!deletedNotes) {
      return res.json({ message: "Note not found" });
    }
    res.json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    console.log("Error in DeleteNotes", error);
    res.json({ message: error.message });
  }
};
