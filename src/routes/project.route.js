import projectController from "../controllers/project.controller.js";

const project = async (fastify, options) => {
  fastify.get("/", projectController.getAllProjects);
  fastify.get("/:id", projectController.getProjectById);
  fastify.post("/", projectController.createProject);
  fastify.put("/:id", projectController.updateProject);
  fastify.delete("/:id", projectController.deleteProject);
};

export default project;
