import { PrismaClient, Role, ProjectStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@ahmedosama.com").toLowerCase().trim();
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@AhmedOsama2026";
  const adminName = process.env.ADMIN_NAME || "Ahmed Osama";

  console.log("--> Seeding Database...");

  // 1. Seed or update the Admin user
  const adminPasswordHash = await bcrypt.hash(adminPassword, 12);
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash: adminPasswordHash,
      role: Role.ADMIN,
      name: adminName,
    },
    create: {
      name: adminName,
      email: adminEmail,
      passwordHash: adminPasswordHash,
      role: Role.ADMIN,
    },
  });
  console.log(`✓ Admin user configured: ${admin.email}`);

  // 2. Seed a sample client for immediate previewing
  const demoEmail = "client@demo.com";
  const demoPasswordHash = await bcrypt.hash("Client123456!", 12);
  const demoClient = await prisma.user.upsert({
    where: { email: demoEmail },
    update: {},
    create: {
      name: "Acme Creative Brand",
      email: demoEmail,
      passwordHash: demoPasswordHash,
      role: Role.USER,
      project: {
        create: {
          totalAmount: 5000,
          paidAmount: 2500,
          driveUrl: "https://drive.google.com",
          projectBrief: "Commercial brand film & 3 vertical reels in 4K LOG.\nLocation: Studio & Outdoor sunset rooftop.",
          shootingSuggestions: JSON.stringify([
            "Golden hour drone establishing shots of the skyline",
            "Slow-motion (120fps) product macro texture details",
            "Atmospheric smoke with warm rim lighting for portraits",
          ]),
          status: ProjectStatus.IN_PROGRESS,
        },
      },
    },
  });
  console.log(`✓ Demo client configured: ${demoClient.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

