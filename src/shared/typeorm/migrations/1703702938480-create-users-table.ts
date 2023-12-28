import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1703702938480 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS users(
            user_id serial4 NOT NULL,
            username varchar(50) NOT NULL,
            "password" varchar(255) NOT NULL,
            email varchar(255)NOT NULL,
            is_verify_email bool NOT NULL DEFAULT FALSE,
            user_role varchar(10) NULL,
            create_at timestamptz NOT NULL
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users`);
  }
}
