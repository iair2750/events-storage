import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const validationFactory = (errors: ValidationError[]) => {
  console.log('err', errors);
  const formatErrors = errors.reduce(
    (prev, err) => ({ ...prev, [err.property]: Object.values(err.constraints ?? {}) }),
    {}
  );
  return new BadRequestException({
    statusCode: 400,
    type: 'validation',
    errors: formatErrors,
    message: 'There were validation errors'
  });
};
