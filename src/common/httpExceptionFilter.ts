import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from './apiResponse';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        let errorMessage = exception.message;

        // TODO: add structured validation error messages, support error codes for localization on the frontend.
        if (exception instanceof BadRequestException) {
            const errors: string[] | string = exception.getResponse()['message'];
            if (Array.isArray(errors)) {
                errorMessage = `${exception.message}: ${errors.join(', ')}`;
            } else {
                if (errors === exception.message) {
                    errorMessage = `${exception.message}`;
                } else {
                    errorMessage = `${exception.message}: ${errors}`;
                }
            }
        }

        response.status(status).json(<ApiResponse>{
            isOk: false,
            error: errorMessage,
        });
    }
}