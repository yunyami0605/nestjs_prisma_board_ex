import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [{ emit: 'stdout', level: 'query' }],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    await this.$connect();

    /**
     *@description 미들웨어 설정
     */
    this.$use(async (params, next) => {
      console.log('@ PARAM');
      console.log(params);
      // if (params.action === 'delete') {
      //   params.action = 'update';
      //   params.args['data'] = { deletedAt: new Date() };
      // }

      // if (params.action == 'deleteMany') {
      //   // Delete many queries
      //   params.action = 'updateMany';
      //   if (params.args.data != undefined) {
      //     params.args.data['deletedAt'] = new Date();
      //   } else {
      //     params.args['data'] = { deletedAt: new Date() };
      //   }
      // }

      const result = await next(params);

      console.log('@ RESULT');

      return result;
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
