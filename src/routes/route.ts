import prisma from "../config/prisma";
import express, { Request, Response } from "express";
import userSeeder from "../../prisma/seeder/userSeeder";
import todoSeeder from "../../prisma/seeder/todoSeeder";
import expressAsyncHandler from "express-async-handler";
import groupSeeder from "../../prisma/seeder/groupSeeder";

const routes = express.Router();

const userSelections = {
  id: true,
  email: true,
  name: true,
};

const todoSelections = {
  id: true,
  title: true,
  description: true,
  completed: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      name: true,
    },
  },
  list: {
    select: {
      id: true,
      name: true,
    },
  },
};

// todo :: need to be test
// run seeders with api
routes.get("/seed", async (_req: Request, res: Response) => {
  try {
    await userSeeder();
    await groupSeeder();
    await todoSeeder();
    res
      .status(200)
      .json({ success: true, message: "Seeding completed successfully." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error seeding data",
      error: error instanceof Error ? error.message : error,
    });
  }
});

// get all users
routes.get(
  "/users",
  expressAsyncHandler(async (_req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany({
        select: userSelections,
      });

      if (!users || users.length === 0) {
        res.status(404).json({
          success: false,
          data: [],
          message: "Users not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: users,
      });
      return;
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
      return;
    }
  })
);

// get user by id (1-3)
routes.get(
  "/users/:id",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      if (!/^[1-9]{1,3}$/.test(id)) {
        res.status(422).json({
          success: false,
          data: [],
          message: "id is not valid",
        });
        return;
      }

      const users = await prisma.user.findMany({
        where: {
          id: parseInt(id),
        },
        select: userSelections,
      });

      if (!users || users.length === 0) {
        res.status(404).json({
          success: false,
          data: [],
          message: "User not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: users,
      });
      return;
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
      return;
    }
  })
);

// create new user
routes.post(
  "/users",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      res.status(400).json({
        success: false,
        message: "Email, name, and password are required.",
      });
      return;
    }

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        res.status(409).json({
          success: false,
          message: "User with this email already exists.",
        });
        return;
      }

      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          password,
        },
      });

      res.status(201).json({
        success: true,
        message: "User created successfully.",
        data: newUser,
      });
      return;
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
      return;
    }
  })
);

// get all task of specific users
routes.get(
  "/users/:userId/tasks",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      if (!/^[1-9]{1,3}$/.test(userId)) {
        res.status(422).json({
          success: false,
          data: [],
          message: "user Id is not valid",
        });
        return;
      }

      const userTasks = await prisma.task.findMany({
        where: {
          userId: parseInt(userId),
        },
        select: todoSelections,
      });

      if (!userTasks || userTasks.length === 0) {
        res.status(404).json({
          success: false,
          message: "there is no tasks found for this user",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: userTasks,
      });
      return;
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
      return;
    }
  })
);

// get all task
routes.get(
  "/tasks",
  expressAsyncHandler(async (_req: Request, res: Response) => {
    try {
      const tasks = await prisma.task.findMany({
        select: todoSelections,
      });

      if (!tasks || tasks.length === 0) {
        res.status(404).json({
          success: false,
          message: "Tasks not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: tasks,
      });
      return;
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
      return;
    }
  })
);

// create new task
routes.post(
  "/tasks",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { title, description, userId, listId } = req.body;

    if (!title || !userId || !listId) {
      res.status(400).json({
        success: false,
        message: "Title, userId, and listId are required.",
      });
      return;
    }

    try {
      const userExists = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!userExists) {
        res.status(404).json({
          success: false,
          message: "User not found.",
        });
        return;
      }

      const listExists = await prisma.list.findUnique({
        where: { id: listId },
      });

      if (!listExists) {
        res.status(404).json({
          success: false,
          message: "list not found.",
        });
        return;
      }

      const newTask = await prisma.task.create({
        data: {
          title,
          description,
          userId,
          listId,
        },
      });

      res.status(201).json({
        success: true,
        message: "Task created successfully.",
        data: newTask,
      });
      return;
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
      return;
    }
  })
);

// get one task based on specific task id
routes.get(
  "/tasks/:id",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!/^[1-9]{1,3}$/.test(id)) {
        res.status(422).json({
          success: false,
          data: [],
          message: "id is not valid",
        });
        return;
      }

      const task = await prisma.task.findFirst({
        where: { id: parseInt(id) },
        select: todoSelections,
      });

      if (!task) {
        res.status(404).json({
          success: false,
          message: "Task not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: task,
      });
      return;
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
      return;
    }
  })
);

// get all lists
routes.get(
  "/lists",
  expressAsyncHandler(async (_req: Request, res: Response) => {
    try {
      const lists = await prisma.list.findMany({});
      if (lists.length === 0 || !lists) {
        res.status(404).json({
          success: false,
          message: "No lists found",
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: lists,
      });
      return;
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
      return;
    }
  })
);

// create new list
routes.post(
  "/lists",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { name, userId } = req.body;

    if (!name || !userId) {
      res.status(400).json({
        success: false,
        message: "Name and userId are required.",
      });
      return;
    }

    if (!/^[1-9]{1,3}$/.test(userId)) {
      res.status(422).json({
        success: false,
        data: [],
        message: "user Id is not valid",
      });
      return;
    }

    try {
      const userExists = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!userExists) {
        res.status(404).json({
          success: false,
          message: "User not found.",
        });
        return;
      }

      const newList = await prisma.list.create({
        data: {
          name,
          userId,
        },
      });

      res.status(201).json({
        success: true,
        message: "List created successfully.",
        data: newList,
      });
      return;
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
      return;
    }
  })
);

// return all tasks from specific list id
routes.get(
  "/lists/:id/tasks",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!/^[1-9]{1,3}$/.test(id)) {
      res.status(422).json({
        success: false,
        data: [],
        message: "id is not valid",
      });
      return;
    }
    try {
      const group = await prisma.list.findUnique({
        where: { id: parseInt(id) },
        select: { id: true, name: true },
      });

      if (!group) {
        res.status(404).json({
          success: false,
          message: "Group not found.",
        });
        return;
      }

      const tasks = await prisma.task.findMany({
        where: { listId: parseInt(id) },
        select: todoSelections,
      });

      if (!tasks || tasks.length === 0) {
        res.status(404).json({
          success: false,
          message: "No tasks found for this group.",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: tasks,
      });
      return;
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
      return;
    }
  })
);

// Test Transaction
routes.get("/transaction-test", async (_req: Request, res: Response) => {
  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: "aaaaaaaaaaaaa",
          email: "aaaaaaaaaaaa@example.com",
          password: "123456789",
        },
      });

      throw new Error("some error happened during crud operation");

      await tx.user.update({
        where: { id: user.id },
        data: { name: "new aaaaaaa" },
      });
    });

    res.json({ success: true, message: "Transaction successful" });
    return;
  } catch (err) {
    res.status(500).json({ success: false, error: "Transaction failed" });
    return;
  }
});

export default routes;
