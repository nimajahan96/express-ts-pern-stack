import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const groupSeeder = async () => {
  const groups = [
    {
      name: "Admin Group",
      userId: 1,
    },
    {
      name: "Project Team A",
      userId: 2,
    },
    {
      name: "Design Team",
      userId: 3,
    },
  ];

  try {
    await prisma.$transaction(async (prisma) => {
      for (const group of groups) {
        const userExists = await prisma.user.findUnique({
          where: { id: group.userId },
        });

        if (!userExists) {
          console.error(
            `User with ID ${group.userId} does not exist for group: ${group.name}`
          );
          continue;
        }

        await prisma.list.create({
          data: {
            name: group.name,
            userId: group.userId,
          },
        });
      }
    });
  } catch (error) {
    console.error(
      "Error seeding groups:",
      error instanceof Error ? error.message : error
    );
  } finally {
    await prisma.$disconnect();
  }
};

export default groupSeeder;
