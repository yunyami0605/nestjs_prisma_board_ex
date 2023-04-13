import { ForbiddenException, NotFoundException } from '@nestjs/common';

/**
 *@description 리소스를 찾을 수 없는 에러
 */
export const Error404 = (errorMessage?: string) => {
  throw new NotFoundException(errorMessage ?? '리소스를 찾을 수 없습니다.');
};

/**
 *@description 권한 없음 에러 메세지
 */
export const Error403 = (errorMessage?: string) => {
  throw new ForbiddenException(errorMessage ?? '권한이 없습니다.');
};
