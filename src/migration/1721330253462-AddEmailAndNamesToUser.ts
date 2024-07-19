import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailAndNamesToUser1721330253462 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if column 'email' exists before adding it
    const emailColumnExists = await queryRunner.hasColumn('user', 'email');
    if (!emailColumnExists) {
      await queryRunner.query(
        `ALTER TABLE "user" ADD "email" character varying NOT NULL`,
      );
    }

    // Check if column 'name' exists before adding it
    const nameColumnExists = await queryRunner.hasColumn('user', 'name');
    if (!nameColumnExists) {
      await queryRunner.query(
        `ALTER TABLE "user" ADD "name" character varying NOT NULL`,
      );
    }

    // Check if column 'lastname' exists before adding it
    const lastnameColumnExists = await queryRunner.hasColumn(
      'user',
      'lastname',
    );
    if (!lastnameColumnExists) {
      await queryRunner.query(
        `ALTER TABLE "user" ADD "lastname" character varying NOT NULL`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the columns if they exist
    const emailColumnExists = await queryRunner.hasColumn('user', 'email');
    if (emailColumnExists) {
      await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    }

    const nameColumnExists = await queryRunner.hasColumn('user', 'name');
    if (nameColumnExists) {
      await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    }

    const lastnameColumnExists = await queryRunner.hasColumn(
      'user',
      'lastname',
    );
    if (lastnameColumnExists) {
      await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastname"`);
    }
  }
}
