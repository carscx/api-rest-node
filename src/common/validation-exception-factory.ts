import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ResponseService } from './response.service';

export function createValidationExceptionFactory(
  responseService: ResponseService,
) {
  return (errors: ValidationError[]) => {
    const errorMessages = errors
      .map((err) => {
        if (err.constraints) {
          return Object.values(err.constraints);
        }
        return [];
      })
      .reduce((acc, val) => acc.concat(val), []);
    return new BadRequestException(
      responseService.error(errorMessages, 'Validation failed', 403),
    );
  };
}
