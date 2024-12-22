import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userSeeder = async () => {
  const users = [
    {
      email: 'john@example.com',
      name: 'John Doe',
      password: '123456789',
    },
    {
      email: 'jane@example.com',
      name: 'Jane Smith',
      password: '123456789',
    },
    {
      email: 'alice@example.com',
      name: 'Alice Jones',
      password: '123456789',
    },
  ];

  try {
    await prisma.$transaction(async (prisma) => {
      for (const user of users) {

        const createdUser = await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            password: user.password,
          },
        });

        console.log(`User ${createdUser.name} added successfully.`);
      }
    });
  } catch (error) {
    console.error('Error seeding users:', error.message);
  }
};

export default userSeeder;