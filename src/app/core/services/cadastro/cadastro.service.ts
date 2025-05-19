import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { User } from '../../../shared/types/user';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private apiUrl = environment.apiUrl;
  http = inject(HttpClient);

  setCadastro(form:User):Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/auth/cadastro`, form);
  }

  buscarCadastro(): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/auth/perfil`);
  }

};
