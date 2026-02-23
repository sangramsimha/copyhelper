// Script to verify Prisma Client is generated without Data Proxy
const { PrismaClient } = require('@prisma/client');

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error('❌ DATABASE_URL is not set');
  process.exit(1);
}

if (dbUrl.startsWith('prisma://')) {
  console.error('❌ DATABASE_URL uses prisma:// protocol. Should use postgresql://');
  process.exit(1);
}

if (!dbUrl.startsWith('postgresql://')) {
  console.error('❌ DATABASE_URL should start with postgresql://');
  process.exit(1);
}

console.log('✅ DATABASE_URL format is correct');

// Try to create Prisma Client
try {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  });
  console.log('✅ Prisma Client created successfully');
  prisma.$disconnect();
} catch (error) {
  console.error('❌ Failed to create Prisma Client:', error.message);
  process.exit(1);
}
