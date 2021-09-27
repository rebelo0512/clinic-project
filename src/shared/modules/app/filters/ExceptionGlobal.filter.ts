/* eslint-disable no-console */
import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { HttpError } from '../errors/HttpError';

interface IException {
  stack: string;
  statusCode: number;
  message: string;
}

@Catch()
export class ExceptionGlobalFilter implements ExceptionFilter {
  logger: Logger;

  constructor(private configService: ConfigService) {
    this.logger = new Logger();
  }

  catch(exception: IException, host: ArgumentsHost): Response {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    this.logger.error(
      `\n-> Method: ${req.method}\n-> Host: ${req.ip}\n-> Url: ${req.originalUrl}\n-> Message: ${exception.message}`,
      '',
      'Filter - ExceptionGlobal',
    );

    if (this.configService.get<string>('nodeEnv') === 'development') {
      console.error(exception.stack);
    }

    if (exception instanceof HttpError) {
      return res
        .status(exception.statusCode)
        .json({ status: 'error', message: exception.message });
    }

    return res.status(500).json({
      status: 'error',
      message: `Internal Server Error\n ${exception.message}`,
    });
  }
}
