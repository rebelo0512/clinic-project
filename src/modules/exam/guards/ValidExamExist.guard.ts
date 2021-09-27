import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { HttpError } from 'src/shared/modules/app/errors/HttpError';
import {
  ExamRepositoryString,
  IExamRepository,
} from '../interfaces/repositories/IExamRepository';

@Injectable()
export class ValidExamExistGuard implements CanActivate {
  constructor(
    @Inject(ExamRepositoryString) private examRepo: IExamRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const lab = await this.examRepo.findById({
      id: Number(req.params.id),
      selectFields: ['examId'],
    });

    if (!lab) {
      throw new HttpError('Exame não encontrado', 404);
    }

    return true;
  }
}
