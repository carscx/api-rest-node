import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Role } from './role.entity';
import { Permission } from '../permissions/permission.entity';
import { UserModule } from '../user/user.module'; // Importar UserModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permission]),
    UserModule, // Asegurarse de importar UserModule aquí
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService, TypeOrmModule],
})
export class RolesModule {}
