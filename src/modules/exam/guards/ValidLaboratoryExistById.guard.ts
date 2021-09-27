import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import {
  ILaboratoryRepository,
  LaboratoryRepositoryString,
} from 'src/modules/laboratory/interfaces/repositories/ILaboratoryRepository';
import { HttpError } from 'src/shared/modules/app/errors/HttpError';

@Injectable()
export class ValidLaboratoryExistByIdGuard implements CanActivate {
  constructor(
    @Inject(LaboratoryRepositoryString) private labRepo: ILaboratoryRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const lab = await this.labRepo.findById({
      id: Number(req.body.labId),
      selectFields: ['labId'],
    });

    if (!lab) {
      throw new HttpError('Laboratório não encontrado', 404);
    }

    return true;
  }
}
