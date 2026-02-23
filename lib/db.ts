import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Ensure we're using direct connection, not Data Proxy
const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set')
}

// Validate that we're using postgresql://, not prisma://
if (databaseUrl.startsWith('prisma://')) {
  throw new Error('DATABASE_URL should use postgresql:// protocol, not prisma://. Please use direct connection string.')
}

// Force direct connection by explicitly setting the datasource URL
// This prevents Prisma from trying to use Data Proxy
const prismaConfig: any = {
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
}

// Explicitly disable Data Proxy if it's somehow enabled
if (process.env.PRISMA_GENERATE_DATAPROXY === 'true') {
  console.warn('WARNING: PRISMA_GENERATE_DATAPROXY is set to true, but we need direct connection. Forcing direct connection.')
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaConfig)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
