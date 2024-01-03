import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDebtorsTable1703741127570 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS debtors(
                debtor_id serial4 NOT NULL,
                "name" varchar(255) NOT NULL,
                "created_by" int4 NOT NULL,
                CONSTRAINT debtors_pkey PRIMARY KEY ("debtor_id")
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS debtors`);
  }
}
