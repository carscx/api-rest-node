import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from '../roles/role.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
