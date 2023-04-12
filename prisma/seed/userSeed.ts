import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export function userSeed() {
  const dataLen = new Array(20).fill(0).map((item, i) => i + 1000);

  const _data = dataLen.map((_item, i) => ({
    email: `test${_item}@test.com`,
    name: `test_name_${_item}`,
    nickname: `test_nick_${_item}`,
    password: `test1234`,
  }));

  prisma.user.createMany({
    data: _data,
  });
}
