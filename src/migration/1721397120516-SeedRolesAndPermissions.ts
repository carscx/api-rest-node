import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRolesAndPermissions1721397120516
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO role (name) VALUES ('admin'), ('user');`,
    );
    await queryRunner.query(
      `INSERT INTO permission (name) VALUES ('can_login'), ('can_recover_password');`,
    );

    const adminRole = await queryRunner.query(
      `SELECT id FROM role WHERE name = 'admin';`,
    );
    const canLoginPermission = await queryRunner.query(
      `SELECT id FROM permission WHERE name = 'can_login';`,
    );
    const canRecoverPasswordPermission = await queryRunner.query(
      `SELECT id FROM permission WHERE name = 'can_recover_password';`,
    );

    await queryRunner.query(
      `INSERT INTO role_permissions_permission (roleId, permissionId) VALUES (${adminRole[0].id}, ${canLoginPermission[0].id});`,
    );
    await queryRunner.query(
      `INSERT INTO role_permissions_permission (roleId, permissionId) VALUES (${adminRole[0].id}, ${canRecoverPasswordPermission[0].id});`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM role_permissions_permission WHERE roleId IN (SELECT id FROM role WHERE name = 'admin');`,
    );
    await queryRunner.query(
      `DELETE FROM role WHERE name IN ('admin', 'user');`,
    );
    await queryRunner.query(
      `DELETE FROM permission WHERE name IN ('can_login', 'can_recover_password');`,
    );
  }
}
