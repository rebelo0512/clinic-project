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
export class ValidLaboratoryExistGuard implements CanActivate {
  constructor(
    @Inject(LaboratoryRepositoryString) private labRepo: ILaboratoryRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const lab = await this.labRepo.findById({
      id: Number(req.params.id),
      selectFields: ['labId'],
    });

    if (!lab) {
      throw new HttpError('Laboratório não encontrado', 404);
    }

    return true;
  }
}
