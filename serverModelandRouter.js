/* ROUTER  */ /* ROUTER  */ /* ROUTER  */ /* ROUTER  */ /* ROUTER  */ /* ROUTER  */

const express = require("express");

const db = require("./projectsModel");

const router = express.Router();

// POST a new project ----------

router.post("/", (req, res) => {
  const newProject = req.body;

  if (newProject.name && newProject.description) {
    db.addProject(newProject)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "There was an error saving your project!" });
      });
  } else {
    res.status(400).json({
      message: "Please provide a name and description for your project!"
    });
  }
});

// GET a project by id ----------

router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.getProject(id)
    .then(project => {
      if (project) {
        const projAct = { ...project };

        db.getProjectActions(id).then(actions => {
          projAct.actions = actions;
          res.status(200).json(projAct);
        });
      } else {
        res.status(404).json({
          message: "The project with the specified id could not be found!"
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was a problem retrieving your project!" });
    });
});

module.exports = router; /* MODEL */ /* MODEL  */ /* MODEL  */ /* MODEL  */ /* MODEL  */

/* MODEL  */ const db = require("../data/dbConfig");

module.exports = {
  addProject,
  getProject,
  getProjectActions
};

function getProjectActions(id) {
  return db("actions")
    .select({
      id: "actions.id",
      description: "actions.description",
      notes: "actions.notes",
      complete: "actions.complete"
    })
    .where({ project_id: id })
    .then(actions => actions.map(obj => accomodateKnexsShortcomings(obj)));
}

function getProject(id) {
  return db("projects")
    .where({ id })
    .first()
    .then(obj => accomodateKnexsShortcomings(obj));
}

function addProject(project) {
  return db("projects")
    .insert(project)
    .then(ids => {
      return getProject(ids[0]);
    })
    .then(obj => accomodateKnexsShortcomings(obj));
}

function accomodateKnexsShortcomings(obj) {
  return {
    ...obj,
    complete: obj.complete ? true : false
  };
}
