import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDebsTable1703741448801 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS debts(
            id serial4 NOT NULL,
            debtor_id int4 NOT NULL,
            amount DECIMAL(10,2),
            description TEXT NULL,
            loan_date timestamptz NOT NULL,
            created_by int4 NOT NULL,
            CONSTRAINT debts_pkey PRIMARY KEY ("id")
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS debt`);
  }
}
