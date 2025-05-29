export interface Curso {
  id: number;
  titulo: string;
  descricao: string;
  imagemCapa?: string;
  dataInicio: string;
  dataFim: string;
  exibir: boolean;
}

export interface PessoaInscrita {
  id: number;
  nome: string;
  email: string;
  inscritoEm: string;
  cursoId: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface ApiError {
  error: string;
  message?: string;
}

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
} 