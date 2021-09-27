import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { HttpError } from 'src/shared/modules/app/errors/HttpError';
import {
  ILaboratoryRepository,
  LaboratoryRepositoryString,
} from '../interfaces/repositories/ILaboratoryRepository';

@Injectable()
export class ValidLaboratoryNameExistGuard implements CanActivate {
  constructor(
    @Inject(LaboratoryRepositoryString) private labRepo: ILaboratoryRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    if (req.body.name) {
      const lab = await this.labRepo.findByName({
        name: req.body.name,
        selectFields: ['labId'],
      });

      if (lab) {
        throw new HttpError(
          'Já existe um laboratório com o nome fornecido',
          409,
        );
      }
    }

    return true;
  }
}
