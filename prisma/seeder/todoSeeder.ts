import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const todoSeeder = async () => {
  const todos = [
    {
      title: 'Finish project report',
      description: 'Complete the final report for the project team.',
      userId: 1,
      groupId: 1,
    },
    {
      title: 'Design the homepage',
      description: 'Create a design prototype for the homepage.',
      userId: 2,
      groupId: 3,
    },
    {
      title: 'Write unit tests',
      description: 'Write unit tests for the new features.',
      userId: 3,
      groupId: 2,
    },
    {
      title: 'refactor code',
      description: 'Refactor the code to improve performance and readability.',
      userId: 3,
      groupId: 2,
    },
    {
      title: 'Design the landing page',
      description: 'Write unit tests for the new features.',
      userId: 3,
      groupId: 2,
    },
    {
      title: 'Design the login page',
      description: 'Design the for the new features.',
      userId: 3,
      groupId: 2,
    },
    {
      title: 'Design the register page',
      description: 'Design the for the new features.',
      userId: 3,
      groupId: 2,
    },
    {
      title: 'Design the forgot password page',
      description: 'Design the for the new features.',
      userId: 3,
      groupId: 2,
    },
    {
      title: 'responsive all pages',
      description: 'responsive all pages for nokia 1200',
      userId: 3,
      groupId: 2,
    },
    {
      title: 'implement the api for auth',
      description: 'implement the api for auth',
      userId: 3,
      groupId: 2,
    },
    {
      title: 'implement mw authorization',
      description: 'implement mw authorization',
      userId: 3,
      groupId: 2,
    },
  ];

  try {
    await prisma.$transaction(async (prisma) => {
      for (const todo of todos) {
        const createdTodo = await prisma.todo.create({
          data: {
            title: todo.title,
            description: todo.description,
            userId: todo.userId,
            groupId: todo.groupId,
          },
        });

        console.log(`To-do "${createdTodo.title}" added successfully.`);
      }
    });
  } catch (error) {
    console.error('Error seeding todos:', error.message);
  }
};

export default todoSeeder;
