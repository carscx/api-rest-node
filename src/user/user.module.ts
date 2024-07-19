import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller'; // Importar UserController
import { Role } from '../roles/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]), // Asegurarse de que Role esté incluido aquí
  ],
  providers: [UserService],
  controllers: [UserController], // Asegurarse de que UserController esté incluido aquí
  exports: [UserService],
})
export class UserModule {}
