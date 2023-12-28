import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'is_verify_email' })
  isVerifyEmail: boolean;

  @Column({ name: 'user_role' })
  userRole: string;

  @Column({ name: 'create_at' })
  createAt: Date;
}
