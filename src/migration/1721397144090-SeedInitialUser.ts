import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class SeedInitialUser1721397144090 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('123456', salt);

    await queryRunner.query(`
        INSERT INTO "user" (email, name, lastname, password)
        VALUES ('karscx@gmail.com', 'Carlos', 'Santos', '${hashedPassword}');
      `);

    const user = await queryRunner.query(
      `SELECT id FROM "user" WHERE email = 'karscx@gmail.com';`,
    );
    const adminRole = await queryRunner.query(
      `SELECT id FROM role WHERE name = 'admin';`,
    );

    await queryRunner.query(`
        INSERT INTO user_roles_role (userId, roleId)
        VALUES (${user[0].id}, ${adminRole[0].id});
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const user = await queryRunner.query(
      `SELECT id FROM "user" WHERE email = 'karscx@gmail.com';`,
    );
    await queryRunner.query(
      `DELETE FROM user_roles_role WHERE userId = ${user[0].id};`,
    );
    await queryRunner.query(
      `DELETE FROM "user" WHERE email = 'karscx@gmail.com';`,
    );
  }
}
