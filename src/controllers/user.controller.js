import User from "../models/user.model.js";

async function getAllUsers(request, reply) {
  try {
    const user = await User.find();
    reply.send(user);
  } catch (error) {
    reply.status(500).send(error);
  }
}
async function getUserById(request, reply) {
  try {
    const user = await User.findById(request.params.id);
    reply.status(200).send(user);
  } catch (error) {
    reply.status(500).send(error);
  }
}
async function createUser(request, reply) {
  try {
    const user = await User.create(request.body);

    const result = user.save();
    reply.status(201).send(result);
  } catch (error) {
    reply.status(500).send(error);
  }
}
async function updateUser(request, reply) {
  try {
    const updateUser = await User.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
        runValidators: true,
      },
    );
    reply.status(200).send(updateUser);
  } catch (error) {
    reply.status(500).send(error);
  }
}
async function deleteUser(request, reply) {
  try {
    await User.findByIdAndDelete(request.params.id);
    reply.status(200).send("User is successful deleted");
  } catch (error) {
    reply.status(500).send(error);
  }
}

export default { deleteUser, createUser, updateUser, getUserById, getAllUsers };
