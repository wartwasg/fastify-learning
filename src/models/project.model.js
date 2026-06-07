import mongoose from "mongoose";
import User from "./user.model.js";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  projectManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
    validate: {
      validator: async (v) => {
        const user = await User.findById(v);
        return ["Admin", "Project Manager"].includes(user.role);
      },
      message: (props) =>
        `User role must ne either 'Admin' or 'Project Manager`,
    },
  },
  teamMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
