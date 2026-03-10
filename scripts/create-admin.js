const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = "admin@guardtunnel.com";
  const password = "admin123";
  const hash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hash },
    create: {
      email,
      password: hash,
      name: "Admin",
      role: "ADMIN",
    },
  });

  console.log("Admin created:", user.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
