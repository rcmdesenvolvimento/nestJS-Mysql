/* eslint-disable prettier/prettier */
import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usuarioService: UsuarioService) {}

  async validarUsuario(email: string, senha: string): Promise<any> {
    const usuario = await this.usuarioService.findOne(email);
    if(usuario && bcrypt.compareSync(senha, usuario.password)){
        const {password, ...result } = usuario;
        return result
    }
    return null;
  }
}
