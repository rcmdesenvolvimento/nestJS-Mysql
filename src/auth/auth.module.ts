import { UsuarioModule } from './../usuario/usuario.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  imports: [UsuarioModule],
  providers: [AuthService],
})
export class AuthModule {}
