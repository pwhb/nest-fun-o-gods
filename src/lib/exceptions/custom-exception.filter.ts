// custom-exception.filter.ts

import
{
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class CustomExceptionFilter extends BaseExceptionFilter
{
  catch(exception: any, host: ArgumentsHost)
  {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.INTERNAL_SERVER_ERROR)
    {
      // Log the error or perform additional actions for internal server errors

      if (exception.name === "ValidationError")
      {
        console.error("exception", {
          json: JSON.parse(JSON.stringify(exception)),
          stack: exception.stack,
          errors: exception.errors,

        });

        return response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          errors: exception.errors || null,
          message: exception.message || null,
        });
      }
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: exception.message || null,
    });
  }
}
