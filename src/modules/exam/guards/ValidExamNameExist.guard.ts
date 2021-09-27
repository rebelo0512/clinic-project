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
export class ValidExamNameExistGuard implements CanActivate {
  constructor(
    @Inject(ExamRepositoryString) private examRepo: IExamRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    if (req.body.name) {
      const exam = await this.examRepo.findByName({
        name: req.body.name,
        selectFields: ['examId'],
      });

      if (exam) {
        throw new HttpError('Já existe um exame com o nome fornecido', 409);
      }
    }

    return true;
  }
}
