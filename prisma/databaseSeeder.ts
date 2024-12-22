import { PrismaClient } from "@prisma/client";
import groupSeeder from "./seeder/groupSeeder";
import todoSeeder from "./seeder/todoSeeder";
import userSeeder from "./seeder/userSeeder";

const prisma = new PrismaClient();

const runSeeder = async () => {
  try {
    await userSeeder();
    await todoSeeder();
    await groupSeeder();
    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error running seeder:', error);
  } finally {
    await prisma.$disconnect();
  }
};

runSeeder();