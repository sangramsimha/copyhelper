// Verify Prisma Client was generated without Data Proxy
const fs = require('fs');
const path = require('path');

const prismaClientPath = path.join(__dirname, '..', 'node_modules', '@prisma', 'client', 'index.js');

if (!fs.existsSync(prismaClientPath)) {
  console.error('❌ Prisma Client not found at:', prismaClientPath);
  process.exit(1);
}

const prismaClientCode = fs.readFileSync(prismaClientPath, 'utf8');

// Check if Data Proxy is mentioned (which would indicate it's enabled)
if (prismaClientCode.includes('prisma://') && prismaClientCode.includes('DataProxy')) {
  console.error('❌ Prisma Client appears to be generated with Data Proxy support!');
  console.error('This will cause errors with direct PostgreSQL connections.');
  process.exit(1);
}

// Check DATABASE_URL
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

console.log('✅ Prisma Client verification passed');
console.log('✅ DATABASE_URL format is correct (postgresql://)');
