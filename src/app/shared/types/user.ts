import { Estado } from "./estado";

export interface User {
    nome: string,
    nascimento: string,
    cpf: string,
    telefone: string,
    email: string,
    senha: string,
    genero: string,
    cidade: string,
    estado: Estado,
    confirmarEmail?:string,
    confirmarPassword?:string
  }
  export interface AuthResponse {
    acess_token: string;
  }
