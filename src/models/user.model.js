import bcrypt from "bcrypt";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Project Manager", "Team Member"],
    default: "Team Member",
  },
  password: {
    type: String,
    required: true,
  },
});
UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(5);

    this.password = await bcrypt.hash(this.password, salt);
  }
});

const user = mongoose.model("User", UserSchema);

export default user;
