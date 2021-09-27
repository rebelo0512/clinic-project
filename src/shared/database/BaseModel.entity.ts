import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseModel {
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
  })
  updatedAt: Date;
}
