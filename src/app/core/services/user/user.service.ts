import { inject, Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../shared/types/user';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User | null>(null);

  tokenService = inject(TokenService);

  constructor(){
    if(this.tokenService.possuiToken()){
      this.decodificarJWT();
    }
  };

  decodificarJWT(){
    const token = this.tokenService.retornarToken();
    const user = jwtDecode(token) as User;
    this.userSubject.next(user);
  };

  retornarUser(){
    return this.userSubject.asObservable();
  };

  salvarToken(token:string){
    this.tokenService.salvarToken(token);
    this.decodificarJWT();
  };

  logout(){
    this.tokenService.excluirToken();
    this.userSubject.next(null);
  };

  estaLogado():boolean{
    return this.tokenService.possuiToken();
  };

}
