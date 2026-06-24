import { PrismaClient } from "@/app/generated/prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";
import { withAccelerate } from "@prisma/extension-accelerate"

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL IS REQUIRED");
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    accelerateUrl: databaseUrl,
  }).$extends(withAccelerate())
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

