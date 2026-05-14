import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const uoms = [
    { name: 'Each / Numbers', abbreviation: 'Nos' },
    { name: 'Boxes', abbreviation: 'Box' },
    { name: 'Packets', abbreviation: 'Pkt' },
    { name: 'Reams', abbreviation: 'Ream' },
    { name: 'Kilograms', abbreviation: 'Kg' },
    { name: 'Litres', abbreviation: 'Ltr' },
  ];

  console.log('Seeding UOMs...');
  for (const u of uoms) {
    await prisma.uom.upsert({
      where: { name: u.name },
      update: {},
      create: u,
    });
  }

  // Optional: Seed a default category
  await prisma.category.upsert({
    where: { code: 'GEN' },
    update: {},
    create: {
      name: 'General',
      code: 'GEN',
      emoji: '📦',
    },
  });

  console.log('Seed complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });