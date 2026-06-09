const { PrismaClient } = require("@prisma/client");
const { withAccelerate } = require("@prisma/extension-accelerate");

let prisma;

if (process.env.NODE_ENV === "production") {
  const { PrismaPg } = require("@prisma/adapter-pg");
  const adapter = new PrismaPg(process.env.DATABASE_URL);
  prisma = new PrismaClient({ adapter });
} else {
  const { PrismaClient: PC } = require("@prisma/client");
  prisma = new PC({
    accelerateUrl: process.env.DATABASE_URL,
  }).$extends(withAccelerate());
}

module.exports = prisma;