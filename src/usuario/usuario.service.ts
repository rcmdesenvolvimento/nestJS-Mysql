/* eslint-disable prettier/prettier */
import { UsuarioCadastrarDto } from './dtos/usuario.cadastrar.dto';
import { Usuario } from './usuario.entity';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ResultadoDto } from 'src/dto/resultado.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async listar(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async cadastrar(usuarioDto: UsuarioCadastrarDto): Promise<ResultadoDto> {
    let usuario = new Usuario();
    usuario.name = usuarioDto.name;
    usuario.email = usuarioDto.email;
    usuario.password = bcrypt.hashSync(usuarioDto.password, 8);
    usuario.telefone = usuarioDto.telefone;
    usuario.cpf = usuarioDto.cpf;
    return this.usuarioRepository
      .save(usuario)
      .then((result) => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Usuário cadastrado com sucesso.',
        };
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: 'Erro ao gravar o usuário.',
        };
      });
  }
  async findOne(email: string): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({email: email});
  }
}
