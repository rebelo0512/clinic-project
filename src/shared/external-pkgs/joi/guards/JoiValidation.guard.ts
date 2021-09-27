import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { HttpError } from 'src/shared/modules/app/errors/HttpError';

@Injectable()
export class JoiValidationGuard implements CanActivate {
  constructor(
    private schema: ObjectSchema,
    private reqProperty: 'body' | 'params' | 'query',
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const reqBody = await context.switchToHttp().getRequest()[this.reqProperty];

    const keysRequest = Object.keys(reqBody);

    const keysSchema = this.schema.$_terms.keys;

    const keysBeValidated: { [key: string]: string | number } = {};

    await Promise.all(
      keysRequest.map(async (key: string) => {
        await Promise.all(
          keysSchema.map(async (keySchema: { key: string }) => {
            if (keySchema.key === key) {
              keysBeValidated[keySchema.key] = reqBody[keySchema.key];
            }
          }),
        );
      }),
    );

    const result = await this.joiValidate(this.schema, keysBeValidated);

    if (typeof result === 'boolean') return true;

    throw new HttpError(result, 400);
  }

  async joiValidate(
    schema: ObjectSchema,
    data: unknown,
  ): Promise<boolean | string> {
    const { error } = schema.validate(data);
    const valid = error == null;

    if (valid) {
      return true;
    }
    const { details }: { details: { message: string }[] } = error;
    const message = details
      .map((err: { message: string }) => err.message)
      .join(',');

    return message;
  }
}
