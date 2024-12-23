import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const todoSeeder = async () => {
  const todos = [
    {
      title: 'Finish project report',
      description: 'Complete the final report for the project team.',
      userId: 1,
      listId: 1,
    },
    {
      title: 'Design the homepage',
      description: 'Create a design prototype for the homepage.',
      userId: 2,
      listId: 2,
    },
    {
      title: 'Write unit tests',
      description: 'Write unit tests for the new features.',
      userId: 3,
      listId: 3,
    },
    {
      title: 'Refactor code',
      description: 'Refactor the code to improve performance and readability.',
      userId: 1,
      listId: 1,
    },
    {
      title: 'Design the landing page',
      description: 'Design a user-friendly landing page.',
      userId: 2,
      listId: 2,
    },
    {
      title: 'Design the login page',
      description: 'Create an intuitive login page design.',
      userId: 3,
      listId: 3,
    },
    {
      title: 'Design the register page',
      description: 'Develop a clean and simple register page design.',
      userId: 3,
      listId: 3,
    },
    {
      title: 'Design the forgot password page',
      description: 'Design a helpful forgot password page.',
      userId: 1,
      listId: 1,
    },
    {
      title: 'Responsive all pages',
      description: 'Make all pages responsive for Nokia 1200.',
      userId: 2,
      listId: 2,
    },
    {
      title: 'Implement the API for auth',
      description: 'Develop the API endpoints for user authentication.',
      userId: 3,
      listId: 3,
    },
    {
      title: 'Implement middleware authorization',
      description: 'Add middleware for user authorization.',
      userId: 2,
      listId: 2,
    },
  ];

  try {
    await prisma.$transaction(async (prisma) => {
      for (const todo of todos) {
        const userExists = await prisma.user.findUnique({ where: { id: todo.userId } });
        const listExists = await prisma.list.findUnique({ where: { id: todo.listId } });

        if (!userExists || !listExists) {
          console.error(
            `Skipping task "${todo.title}": User or List does not exist (userId: ${todo.userId}, listId: ${todo.listId}).`
          );
          continue;
        }

        // Create the task
        await prisma.task.create({
          data: {
            title: todo.title,
            description: todo.description,
            completed: false,
            userId: todo.userId,
            listId: todo.listId,
          },
        });
      }
    });
  } catch (error) {
    if(error instanceof Error) {
      console.error('Error seeding tasks:', error.message);
    }
    console.error('Error seeding tasks');
  }
};

export default todoSeeder;
