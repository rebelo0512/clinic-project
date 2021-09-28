import { IDocumentSwagger } from 'src/shared/external-pkgs/swagger/interfaces/IDocumentSwagger';

export const laboratoryGetAllDocument: IDocumentSwagger = {
  apiOperation: {
    summary: 'Retorna os laboratórios pelo status',
    description:
      'Retorna os laboratórios pelo status. Por padrão vem os ativos',
    parameters: [
      { in: 'query', name: 'status', example: 'true | false', required: false },
    ],
  },
  api200Response: {
    status: 200,
    description: 'Retorna os laboratórios',
  },
  api400Response: {
    status: 400,
    description: 'Status invalido',
  },
};

export const laboratoryCreateDocument: IDocumentSwagger = {
  apiOperation: {
    summary: 'Cadastra um novo laboratório',
    description: 'Cadastra um novo laboratório.',
  },
  api201Response: {
    status: 201,
    description: 'Retorna a entidade do laboratório cadastrado',
  },
  api400Response: {
    status: 400,
    description: 'Nome ou endereço está invalido',
  },
  api409Response: {
    status: 409,
    description: 'Já existe um laboratório com o nome fornecido',
  },
};

export const laboratoryCreateInLotDocument: IDocumentSwagger = {
  apiOperation: {
    summary: 'Cadastra varios laboratórios de uma vez',
    description: 'Cadastra varios laboratórios de uma vez.',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              laboratories: {
                type: 'array',
                items: {
                  properties: {
                    name: { type: 'string' },
                    address: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  api201Response: {
    status: 201,
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            properties: {
              id: { type: 'number' },
              message: { type: 'string' },
              status: { type: 'boolean' },
            },
          },
        },
      },
    },
  },
  api400Response: {
    status: 400,
    description: 'Array de laboratórios está invalido',
  },
};

export const laboratoryUpdateInLotDocument: IDocumentSwagger = {
  apiOperation: {
    summary: 'Atualiza varios laboratórios',
    description: 'Atualiza varios laboratório.',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              laboratories: {
                type: 'array',
                items: {
                  properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    address: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  api200Response: {
    status: 200,
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            properties: {
              id: { type: 'number' },
              message: { type: 'string' },
              status: { type: 'boolean' },
            },
          },
        },
      },
    },
  },
  api400Response: {
    status: 400,
    description: 'Array de laboratórios está invalido',
  },
};

export const laboratoryUpdateDocument: IDocumentSwagger = {
  apiOperation: {
    summary: 'Atualiza um laboratório',
    description: 'Atualiza um laboratório.',
  },
  api200Response: {
    status: 200,
    description: 'Retorna a entidade do laboratório atualizado',
  },
  api400Response: {
    status: 400,
    description: 'Nome ou endereço está invalido',
  },
  api404Response: {
    status: 404,
    description: 'Laboratório não encontrado',
  },
  api409Response: {
    status: 409,
    description: 'Já existe um laboratório com o nome fornecido',
  },
};

export const laboratoryInactiveDocument: IDocumentSwagger = {
  apiOperation: {
    summary: 'Inativa um laboratório',
    description: 'Inativa um laboratório.',
  },
  api200Response: {
    status: 200,
    description: 'Retorna a entidade do laboratório inativado',
  },
  api400Response: {
    status: 400,
    description: 'Id está invalido',
  },
  api404Response: {
    status: 404,
    description: 'Laboratório não encontrado',
  },
};

export const laboratoryDeleteDocument: IDocumentSwagger = {
  apiOperation: {
    summary: 'Remove um laboratório',
    description: 'Remove um laboratório com todas as suas associações.',
  },
  api200Response: {
    status: 200,
    description: 'Retorna a entidade do laboratório excluído',
  },
  api400Response: {
    status: 400,
    description: 'Id está invalido',
  },
  api404Response: {
    status: 404,
    description: 'Laboratório não encontrado',
  },
};

export const laboratoryDeleteInLotDocument: IDocumentSwagger = {
  apiOperation: {
    summary: 'Remove varios laboratórios',
    description: 'Remove varios laboratório com todas as suas associações.',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              laboratories: {
                type: 'array',
                items: {
                  properties: {
                    id: { type: 'number' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  api200Response: {
    status: 200,
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            properties: {
              id: { type: 'number' },
              status: { type: 'boolean' },
            },
          },
        },
      },
    },
  },
  api400Response: {
    status: 400,
    description: 'Array de laboratórios está invalido',
  },
};
