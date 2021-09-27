import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpError extends HttpException {
  public statusCode: number;

  constructor(message: string, status = HttpStatus.FORBIDDEN) {
    super({ status: 'error', message }, status);

    this.statusCode = status;
  }
}
