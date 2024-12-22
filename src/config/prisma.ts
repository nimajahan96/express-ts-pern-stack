import { PrismaClient } from "@prisma/client";

const isDevelopment: boolean = process.env.NODE_ENV === "development";

const prisma = new PrismaClient({
  log: isDevelopment ? ["query", "info", "warn", "error"] : [],
  errorFormat: isDevelopment ? "pretty" : "minimal",
});

export default prisma;
