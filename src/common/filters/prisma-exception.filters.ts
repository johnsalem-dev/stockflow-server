import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Response } from "express";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
    catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        switch(exception.code){
            case 'P2002':
                response.status(HttpStatus.CONFLICT).json({
                    statusCode: HttpStatus.CONFLICT,
                    message: `Duplicate field value: ${exception.meta?.target}`,
                    error: 'Conflict'
                });
                break;
                
            case 'P2003': 
                response.status(HttpStatus.BAD_REQUEST).json({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Cannot delete record: it is being used by another resource.',
                });
                break;

            case 'P2025':
                response.status(HttpStatus.NOT_FOUND).json({
                    statuscCode: HttpStatus.NOT_FOUND,
                    message: 'Record not found in the database'
                });
                break;

            default:
                super.catch(exception, host);
                break;

        }
            
    }
}