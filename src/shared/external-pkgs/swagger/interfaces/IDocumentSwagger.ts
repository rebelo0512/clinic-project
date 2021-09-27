import { ApiResponseOptions } from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export interface IDocumentSwagger {
  apiOperation: Partial<OperationObject>;
  api200Response?: ApiResponseOptions;
  api201Response?: ApiResponseOptions;
  api400Response?: ApiResponseOptions;
  api401Response?: ApiResponseOptions;
  api404Response?: ApiResponseOptions;
  api409Response?: ApiResponseOptions;
  api500Response?: ApiResponseOptions;
}
