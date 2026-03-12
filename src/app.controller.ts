import { Controller, Get, Post, Patch , Param , Body } from '@nestjs/common';
import { AppService, Cliente} from './app.service';

@Controller('gerenciaplanos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getServicoGestao(): string {
    return this.appService.getServicoGestao();
  }

// Endpoint para cadastrar cliente *
  @Post('clientes')
  cadastrarCliente(
    @Body('codigoCli') codigoCli: number,
    @Body('nome') nome: string,
    @Body('email') email: string,
  ) {
    return this.appService.cadastrarCliente(codigoCli, nome, email);
  }

// Endpoint para listar clientes *
  @Get('clientes')
  listarClientes(): Cliente[] {
    return this.appService.listarClientes();
  }

// Endpoint para listar planos *
  @Get('planos')
  listarPlanos(){
    return this.appService.listarPlanos()
  }

// Endpoint para criar assinatura *
  @Post('assinaturas')
  criarAssinatura(
  @Body('codCli') codCli: number,
  @Body('codPlano') codPlano: number,
  @Body('custoFinal') custoFinal: number,
  @Body('descricao') descricao: string,
) {
    return this.appService.criarAssinatura(codCli, codPlano, custoFinal, descricao);
  }

  // Endpoint para atualizar plano *
  @Patch('planos/:idPlano')
  atualizarPlano(
    @Param('idPlano') idPlano: number,
    @Body('custoMensal') custoMensal: number,
  ){
    return this.appService.atualizarPlano(Number(idPlano), custoMensal);
  }

  // Endpoint para listar assinaturas por tipo *
  @Get('assinaturas/:tipo')
  listarAssinaturas(
    @Param('tipo') tipo:string
  ) {
    return this.appService.listarAssinaturas(tipo);
  }

  // Endpoint para listar assinaturas por cliente *
  @Get('asscli/:codcli')
  assinaturasCliente(
    @Param('codcli') codcli: number
  ) {
    return this.appService.assinaturasCliente(Number(codcli));
  }


  // Endpoint para listar assinaturas por plano *
  @Get('assinaturaplano/:codplano')
  assinaturasPlano(
    @Param('codplano') codplano: number
  ) {
    return this.appService.assinaturasPlano(codplano)
  }

  // Endpoint para cadastrar plano
  @Post('planos')
  cadastrarPlano(
    @Body('codigoPlano') codigoPlano: number,
    @Body('nomePlano') nomePlano: string,
    @Body('custoMensal') custoMensal: number,
    @Body('descricao') descricao: string,
  ) {
    return this.appService.cadastrarPlano(
      codigoPlano, nomePlano, custoMensal, descricao);
  }


}
