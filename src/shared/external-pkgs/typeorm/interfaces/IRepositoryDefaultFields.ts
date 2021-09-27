export interface IRepositoryDefaultFields<T> {
  selectFields: Array<keyof T> | Array<'*'>;
  fieldOrder?: keyof T;
  orderBy?: 'ASC' | 'DESC';
}

export interface IRepositoryIdField {
  id: number;
}
