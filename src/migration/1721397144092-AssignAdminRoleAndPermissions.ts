import { MigrationInterface, QueryRunner } from 'typeorm';

export class AssignAdminRoleAndPermissions1721397144092
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insert the admin role if it does not exist
    await queryRunner.query(`
      INSERT INTO role (name)
      VALUES ('admin')
      ON CONFLICT (name) DO NOTHING;
    `);

    // Get the admin role ID
    const adminRole = await queryRunner.query(`
      SELECT id FROM role WHERE name = 'admin';
    `);

    // Insert the user if it does not exist
    await queryRunner.query(`
      INSERT INTO "user" (email, name, lastname, password)
      VALUES ('karscx@gmail.com', 'Carlos', 'Santos', '$2b$10$BLTFVWmFTaSjeUfM5SgU6.4ONFaSSVNBFhG9wZ.6YFsLJOcYAy7A6')
      ON CONFLICT (email) DO NOTHING;
    `);

    // Get the user ID
    const user = await queryRunner.query(`
      SELECT id FROM "user" WHERE email = 'karscx@gmail.com';
    `);

    // Assign the admin role to the user
    await queryRunner.query(`
      INSERT INTO user_roles_role ("userId", "roleId")
      VALUES (${user[0].id}, ${adminRole[0].id})
      ON CONFLICT DO NOTHING;
    `);

    // Insert basic permissions if they do not exist
    await queryRunner.query(`
      INSERT INTO permission (name) VALUES ('can_login')
      ON CONFLICT (name) DO NOTHING;
    `);
    await queryRunner.query(`
      INSERT INTO permission (name) VALUES ('can_recover_password')
      ON CONFLICT (name) DO NOTHING;
    `);
    await queryRunner.query(`
      INSERT INTO permission (name) VALUES ('can_access_protected_route')
      ON CONFLICT (name) DO NOTHING;
    `);

    // Get all permissions
    const permissions = await queryRunner.query(`
      SELECT id FROM permission;
    `);

    // Assign all permissions to the admin role
    for (const permission of permissions) {
      await queryRunner.query(`
        INSERT INTO role_permissions_permission ("roleId", "permissionId")
        VALUES (${adminRole[0].id}, ${permission.id})
        ON CONFLICT DO NOTHING;
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Get the user and admin role IDs
    const user = await queryRunner.query(`
      SELECT id FROM "user" WHERE email = 'karscx@gmail.com';
    `);
    const adminRole = await queryRunner.query(`
      SELECT id FROM role WHERE name = 'admin';
    `);

    // Remove the admin role assignment from the user
    await queryRunner.query(`
      DELETE FROM user_roles_role
      WHERE "userId" = ${user[0].id} AND "roleId" = ${adminRole[0].id};
    `);

    // Remove all permissions from the admin role
    await queryRunner.query(`
      DELETE FROM role_permissions_permission
      WHERE "roleId" = ${adminRole[0].id};
    `);
  }
}
