import { Router } from "express";

import { Todo } from "../models/Todo";

const router = Router();

router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).send(errorMessage);
  }
});

router.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = Todo.build({ description });
    await newTodo.save();
    res.sendStatus(201);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).send(errorMessage);
  }
});

router.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).send("Todo not found");
    }

    await todo.destroy();
    res.sendStatus(200);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).send(errorMessage);
  }
});

router.patch("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed, description } = req.body;
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).send("Todo not found");
    }

    const updates: Partial<{ completed: boolean; description: string}> = {};
    if (completed !== undefined) {
      updates.completed = completed;
    };
    if(description !== undefined) {
      updates.description = description;
    }
    await todo.update(updates);
    return res.json(todo);
    
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).send(errorMessage);
  }
});

export default router;
