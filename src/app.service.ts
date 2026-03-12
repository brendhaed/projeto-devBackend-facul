import { Injectable } from '@nestjs/common';

export interface Cliente {
  codigoCli: number;
  nome: string;
  email: string;
}
export interface Assinatura {
  codigoAssinatura: number;
  codigoPlano: number;
  codigoCli: number;
  custoFinal: number;
  descricao: string;
  inicioFidelidade: Date;
  fimFidelidade: Date;
  dataUltimoPagamento: Date;
}

export interface Plano {
  codigoPlano: number;
  nomePlano: string;
  custoMensal: number;
  descricao: string;
}

@Injectable()
export class AppService {
  private clientes: Cliente[] = [];
  private assinaturas: Assinatura[] = [];
  private planos: Plano[] = [];

  getServicoGestao(): string {
    return 'Olá, seja bem-vindo ao serviço de gestão de projetos!';
  }

  cadastrarCliente(codigoCli: number, nome: string, email: string) {
    const novoCliente: Cliente = {
      codigoCli,
      nome,
      email,
    };
    this.clientes.push(novoCliente);
    return 'Cliente cadastrado com sucesso!';
  }

  listarClientes() {
    return this.clientes;
  }
  listarPlanos(): Plano[] {
    return this.planos;
  }

  criarAssinatura(
    codCli: number,
    codPlano: number,
    custoFinal: number,
    descricao: string
  ) {
    const novaAssinatura: Assinatura = {
    codigoAssinatura: this.assinaturas.length + 1,
    codigoPlano: codPlano,
    codigoCli: codCli,
    custoFinal: custoFinal,
    descricao: descricao,
    inicioFidelidade: new Date(),
    fimFidelidade: new Date(),
    dataUltimoPagamento: new Date()
  };

    this.assinaturas.push(novaAssinatura);

    return novaAssinatura;
  }

  cadastrarPlano(
    codigoPlano: number,
    nomePlano: string,
    custoMensal: number,
    descricao: string,
  ) {
    const novoPlano: Plano = {
      codigoPlano,
      nomePlano,
      custoMensal,
      descricao,
    };
    this.planos.push(novoPlano);
    return 'Plano cadastrado!';
  }

  atualizarPlano(idPlano:number, custoMensal:number){
    const plano = this.planos.find(p => p.codigoPlano === idPlano); 

    if (plano){
      plano.custoMensal = custoMensal;
      return plano
    }

    return {
      message: 'Plano não encontrado'
    };
  }

  // listarAssinaturas(tipo:string) {
  //   if (tipo === 'todas') {
  //     return this.assinaturas;
  //   }
  //   return "Filtro ainda não implementado"
  // }

  listarAssinaturas(tipo: string) {
  if (tipo === 'TODOS') {
    return this.assinaturas;
  }
  if (tipo === 'ATIVOS') {
    return this.assinaturas.filter(a => a.fimFidelidade > new Date());
  }
  if (tipo === 'CANCELADOS') {
    return this.assinaturas.filter(a => a.fimFidelidade <= new Date());
  }
  return { mensagem: 'Tipo inválido' };
}

  assinaturasCliente(codcli: number) {
    return this.assinaturas.filter(
      assinatura => assinatura.codigoCli === codcli
    );
  }

  assinaturasPlano(codplano:number) {
    return this.assinaturas.filter(
      assinatura => assinatura.codigoPlano === codplano
    )
  }
}
