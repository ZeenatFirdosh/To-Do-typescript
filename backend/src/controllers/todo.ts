import Todo, { ITodo } from "../models/todo";
import { Request, Response } from "express";

export const createTodo = async (req: Request, res: Response) => {
  const todo = new Todo<ITodo>(req.body);

  try {
    const result = await todo.save();
    res.status(201).json({
      result
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
  console.log(res,"res")

 
};

export const getTodos = async (req: Request, res: Response) => {
  const todos = await Todo.find<ITodo>();

  res.json({
    todos,
  });
};

export const getTodoById = async (req: Request, res: Response) => {
  const todoId = req.params._id;

  try {
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({
        message: "The todo does not exist.",
      });
    }

    return res.json({
      todo,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

export const deleteTodoById = async (req: Request, res: Response) => {
  const todoId = req.params._id;

  try {
    const todo = await Todo.findByIdAndDelete(todoId);

    if (!todo) {
      return res.status(404).json({
        message: "The todo does not exist.",
      });
    }

    return res.status(200).json({
      message: "Todo was deleted successfully.",
      acknowledged: true,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};
