import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  success(data: any, message = 'Success') {
    return {
      statusCode: 200,
      message,
      data,
    };
  }

  created(data: any, message = 'Resource created successfully') {
    return {
      statusCode: 201,
      message,
      data,
    };
  }

  error(errors: string[], message = 'An error occurred', statusCode = 400) {
    return {
      statusCode,
      message,
      errors,
    };
  }

  unauthorized(message = 'Invalid credentials') {
    return {
      statusCode: 401,
      message,
    };
  }

  notFound(message = 'Resource not found') {
    return {
      statusCode: 404,
      message,
    };
  }
}
