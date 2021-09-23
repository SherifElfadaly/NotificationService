import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(HttpException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    return new RpcException(exception.getResponse());
  }
}
