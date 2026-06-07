import InvalidUser from "../error/InvalidUser.js";
import project from "../models/project.model.js";
import user from "../models/user.model.js";

async function getAllProjects(request, reply) {
  const proj = await project.find();
  reply.send(proj);
}

async function getProjectById(request, reply) {
  const proj = await project.findById(request.params.id);
  reply.status(200).send(proj);
}

async function createProject(request, reply) {
  if (!request.body.projectManager) {
    throw new InvalidUser("Invalid Project Manager");
  }

  const projManager = await user.findById(request.body.projectManager);

  if (!projManager) {
    throw new InvalidUser("User not found");
  }

  if (!["Admin", "Project Manager"].includes(projManager.role)) {
    throw new InvalidUser("Invalid Project Manager");
  }

  const proj = await project.create(request.body);
  reply.status(201).send(proj);
}

async function updateProject(request, reply) {
  const updatedProject = await project.findByIdAndUpdate(
    request.params.id,
    request.body,
    {
      new: true,
      runValidators: true,
    },
  );
  reply.status(200).send(updateProject);
}

async function deleteProject(request, reply) {
  await project.findByIdAndDelete(request.params.id);
  reply.status(200).send("Project is successful deleted");
}

export default {
  deleteProject,
  createProject,
  updateProject,
  getProjectById,
  getAllProjects,
};
