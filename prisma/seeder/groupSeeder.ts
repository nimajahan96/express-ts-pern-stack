import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const groupSeeder = async () => {
  const groups = [
    {
      name: 'Admin Group',
      userIds: [1, 2],
    },
    {
      name: 'Project Team A',
      userIds: [2, 3],
    },
    {
      name: 'Design Team',
      userIds: [1, 3, 4],
    },
  ];

  try {
    await prisma.$transaction(async (prisma) => {
      for (const group of groups) {
        const usersExist = await prisma.user.findMany({
          where: { id: { in: group.userIds } },
        });

        if (usersExist.length !== group.userIds.length) {
          console.error(`Some users do not exist for group: ${group.name}`);
          continue;
        }

        const createdGroup = await prisma.group.create({
          data: {
            name: group.name,
            members: {
              connect: group.userIds.map((userId) => ({ id: userId })),
            },
          },
        });

        console.log(`Group "${createdGroup.name}" added successfully.`);
      }
    });
  } catch (error) {
    console.error('Error seeding groups:', error.message);
  }
};

export default groupSeeder;
