import { PrismaClient } from '@prisma/client';
import _ from 'lodash';

const prisma = new PrismaClient();

export async function postSeed() {
  const dataLen = new Array(14).fill(0).map((item, i) => i + 1000);

  const _data = dataLen.map((_item, i) => ({
    title: `happy_title_${_item}`,
    content: `calern_content_${_item}`,
    authorId: 1,
  }));

  await prisma.post.createMany({
    data: _data,
  });
}
