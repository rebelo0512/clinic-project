import { IDocumentSwagger } from 'src/shared/external-pkgs/swagger/interfaces/IDocumentSwagger';

export const examGetAllDocument: IDocumentSwagger = {
  apiOperation: {
    summary: 'Retorna os exames pelo status',
    description: 'Retorna os exames pelo status. Por padrão vem os ativos',
  },
  api200Response: {
    status: 200,
    description: 'Retorna os exames',
  },
  api400Response: {
    status: 400,
    description: 'Status invalido',
  },
};

export const examFindAllLaboratoriesDocument: IDocumentSwagger = {
  apiOperation: {
    summary: 'Retorna os laboratórios de um exame',
    description: 'Retorna os laboratórios de um exame',
  },
  api200Response: {
    status: 200,
    description:
      'Retorna um objeto com dados do exame e um array laboratories com todos laboratórios',
  },
  api400Response: {
    status: 400,
    description: 'Name invalido',
  },
  api404Response: {
    status: 404,
    description: 'Exame não encontrado',
  },
};

export const examCreateDocument: IDocumentSwagger = {
  apiOperation: {
    summary: 'Cadastra um novo exame',
    description: 'Cadastra um novo exame.',
  },
  api201Response: {
    status: 201,
    description: 'Retorna a entidade do exame cadastrado',
  },
  api400Response: {
    status: 400,
    description: 'Nome ou tipo está invalido',
  },
};

export const examCreateInLotDocument: IDocumentSwagger = {
  apiOperation: {
    summary: 'Cadastra varios exames',
    description: 'Cadastra varios exames.',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              exams: {
                type: 'array',
                items: {
                  properties: {
                    name: { type: 'string' },
                    type: {
                      type: 'string',
                      example: 'IMAGEM ou ANALISE CLINICA',
                    },
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
    description: 'Array de exames está invalido',
  },
};

export const examUpdateInLotDocument: IDocumentSwagger = {
  apiOperation: {
    summary: 'Atualiza varios exames',
    description: 'Atualiza varios exames.',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              exams: {
                type: 'array',
                items: {
                  properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    type: {
                      type: 'string',
                      example: 'IMAGEM ou ANALISE CLINICA',
                    },
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
    description: 'Array de exames está invalido',
  },
};

export const examUpdateDocument: IDocumentSwagger = {
  apiOperation: {
    summary: 'Atualiza um exame',
    description: 'Atualiza um exame.',
  },
  api200Response: {
    status: 200,
    description: 'Retorna a entidade do exame cadastrado',
  },
  api400Response: {
    status: 400,
    description: 'Nome ou tipo está invalido',
  },
  api404Response: {
    status: 404,
    description: 'Exame não encontrado',
  },
};

export const examAssociateWithLaboratoryDocument: IDocumentSwagger = {
  apiOperation: {
    summary: 'Associa um exame em um laboratório',
    description: 'Associa um exame em um laboratório.',
  },
  api200Response: {
    status: 200,
    description:
      'Retorna um objeto com a key message escrito: "Exame associado com sucesso ao laboratório"',
  },
  api400Response: {
    status: 400,
    description: 'labId é invalido',
  },
  api404Response: {
    status: 404,
    description: 'Exame não encontrado | Laboratório não encontrado',
  },
};

export const examDisassociateWithLaboratoryDocument: IDocumentSwagger = {
  apiOperation: {
    summary: 'Desassocia um exame de um laboratório',
    description: 'Desassocia um exame de um laboratório.',
  },
  api200Response: {
    status: 200,
    description:
      'Retorna um objeto com a key message escrito: "Exame desassociado com sucesso ao laboratório"',
  },
  api400Response: {
    status: 400,
    description:
      'labId é invalido | Exame não associado ao laboratório informado',
  },
  api404Response: {
    status: 404,
    description: 'Exame não encontrado | Laboratório não encontrado',
  },
};

export const examInactiveDocument: IDocumentSwagger = {
  apiOperation: {
    summary: 'Inativa um exame',
    description: 'Inativa um exame.',
  },
  api200Response: {
    status: 200,
    description: 'Retorna a entidade do exame inativado',
  },
  api400Response: {
    status: 400,
    description: 'Id está invalido',
  },
  api404Response: {
    status: 404,
    description: 'Exame não encontrado',
  },
};

export const examDeleteInLotDocument: IDocumentSwagger = {
  apiOperation: {
    summary: 'Exclui varios exames',
    description: 'Exclui varios exames e suas associações',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              exams: {
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
    description: 'Array de exames está invalido',
  },
};

export const examDeleteDocument: IDocumentSwagger = {
  apiOperation: {
    summary: 'Remove um exame',
    description: 'Remove um exame com todas as suas associações.',
  },
  api200Response: {
    status: 200,
    description: 'Retorna a entidade do exame excluído',
  },
  api400Response: {
    status: 400,
    description: 'Id está invalido',
  },
  api404Response: {
    status: 404,
    description: 'Exame não encontrado',
  },
};
