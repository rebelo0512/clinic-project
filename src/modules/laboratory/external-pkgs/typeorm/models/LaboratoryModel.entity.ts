import { BaseModel } from 'src/shared/database/BaseModel.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('laboratories')
export class LaboratoryModel extends BaseModel {
  @PrimaryGeneratedColumn('increment')
  labId: number;

  @Column({ length: 250, unique: true })
  labName: string;

  @Column({ length: 250 })
  labAddress: string;

  @Column({ default: true })
  labStatus: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  changeFields(): void {
    this.labName = this.labName.toUpperCase();
    this.labAddress = this.labAddress.toUpperCase();
  }
}
