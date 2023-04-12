import { PrismaClient } from '@prisma/client';
import { postSeed } from './postSeed';
import { userSeed } from './userSeed';

const prisma = new PrismaClient();

async function seed() {
  userSeed();
  postSeed();
}

seed()
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    prisma.$disconnect();
  });
