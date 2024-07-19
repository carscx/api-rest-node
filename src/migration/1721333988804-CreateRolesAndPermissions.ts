import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRolesAndPermissions1721333988804
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE role (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
      );
    `);

    await queryRunner.query(`
      CREATE TABLE permission (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
      );
    `);

    await queryRunner.query(`
      CREATE TABLE role_permissions_permission (
        roleId INT NOT NULL,
        permissionId INT NOT NULL,
        CONSTRAINT fk_role
          FOREIGN KEY(roleId)
          REFERENCES role(id)
          ON DELETE CASCADE,
        CONSTRAINT fk_permission
          FOREIGN KEY(permissionId)
          REFERENCES permission(id)
          ON DELETE CASCADE,
        PRIMARY KEY (roleId, permissionId)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE role_permissions_permission;`);
    await queryRunner.query(`DROP TABLE role;`);
    await queryRunner.query(`DROP TABLE permission;`);
  }
}
