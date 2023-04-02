import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiResponse as SwaggerApiResponses,
} from '@nestjs/swagger';

export interface ApiOperationAndResponsesOptions<T> {
  summary: string;
  description?: string;
  responses?: {
    status: number;
    description: string;
  }[];
  DtoType?: string | Function | Type<unknown> | [Function];
  isNotBearerAuth?: boolean;
}

/**
 *@description post 커스텀 데코레이터
 *@param isNotBearerAuth - 토큰 유무 여부, default: 있음
 *@param DtoType - body data dto
 */
export function PostDecorator<T = any>(
  options: ApiOperationAndResponsesOptions<T>,
) {
  const { summary, description, responses, isNotBearerAuth, DtoType } = options;

  const _responses = responses ?? [
    { status: 201, description: '생성 성공' },
    { status: 400, description: '잘못된 폼' },
  ];

  const operation = {
    _summary: `${summary} API`,
    description: description ?? summary,
  };

  const bearAuthTmp = isNotBearerAuth ? [] : [ApiBearerAuth()];

  const decorators = [
    ApiOperation(operation),
    ...bearAuthTmp,
    ..._responses.map((r) =>
      ApiResponse({ status: r.status, description: r.description }),
    ),
  ];

  ApiBody({
    type: DtoType,
  });

  return applyDecorators(...decorators);
}

// function CreatePost(data: CreatePostSwaggerData) {
//   ApiOperation({
//     summary: data.summary,
//   });

//   ApiBearerAuth();

//   ApiBody({
//     type: data.bodyType,
//   });
// }

// export const CreatePost = createParamDecorator(
//   (data: CreatePostSwaggerData, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();

//     ApiOperation({
//       summary: data.summary,
//     })(request);

//     ApiBearerAuth()(request);

//     ApiBody({
//       type: data.bodyType,
//     })(request);

//     return request.body;
//   },
// );
