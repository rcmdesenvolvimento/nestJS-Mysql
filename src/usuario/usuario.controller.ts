/* eslint-disable prettier/prettier */
import { UsuarioCadastrarDto } from './dtos/usuario.cadastrar.dto';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('/listar')
  async listarTodos(): Promise<Usuario[]> {
    return await this.usuarioService.listar();
  }

  @Post('/cadastrar')
  async cadastrar(@Body() usuarioDto: UsuarioCadastrarDto): Promise<ResultadoDto> {
    return this.usuarioService.cadastrar(usuarioDto);
  }
}
