const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repo);

  return response.json(repo);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body;

  const index = repositories.findIndex(item => item.id === id);

  if (index < 0)
    return response.status(400).json({ error: `Project not found!` });

  const repo = {
    ...repositories[index],
    title,
    url,
    techs,
  };

  repositories[index] = {
    ...repositories[index],
    title,
    url,
    techs,
  };

  return response.json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const index = repositories.findIndex(item => item.id === id);

  if (index < 0)
    return response.status(400).json({ error: `Project not found!` });

  repositories.splice(index, 1);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const index = repositories.findIndex(item => item.id === id);

  if (index < 0)
    return response.status(400).json({ error: `Project not found!` });

  repositories[index].likes += 1;

  return response.json(repositories[index]);
});

module.exports = app;
