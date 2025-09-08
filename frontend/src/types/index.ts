export interface TipoUsuario {
  id: string;
  descricao: string;
  situacao: boolean;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  situacao: boolean;
  role: 'ADMIN' | 'SUPERADMIN' | null;
  tipoDeProfissional: TipoUsuario;
}