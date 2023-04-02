import { ApiProperty } from '@nestjs/swagger';

export class HttpErrorResponse4 {
  @ApiProperty({
    description: '상태코드',
  })
  statusCode: number;

  @ApiProperty({
    description: '에러 메세지',
  })
  message: string[];

  @ApiProperty({
    description: '에러 요약',
  })
  error: string;
}
