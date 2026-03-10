const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@guardtunnel.com" },
    update: {},
    create: {
      email: "admin@guardtunnel.com",
      name: "Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  const secretUrl = process.env.ADMIN_SECRET_URL || "gt-secure-panel-x7k9";

  await prisma.adminSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      secretUrl,
    },
  });

  console.log("");
  console.log("✅ Admin created:", admin.email);
  console.log("✅ Secret URL: /secure/" + secretUrl);
  console.log("📧 Login: admin@guardtunnel.com");
  console.log("🔑 Password: admin123");
  console.log("");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
