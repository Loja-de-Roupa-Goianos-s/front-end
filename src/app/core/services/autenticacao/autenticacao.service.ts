import { UserService } from './../user/user.service';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
    access_token: string;
  }
@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private apiUrl = environment.apiUrl;
  http = inject(HttpClient);
  userService = inject(UserService);

  autenticar(email: string, senha: string): Observable<HttpResponse<AuthResponse>>  {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`,
           { email, senha },
           {observe:'response'}).pipe(tap((response) => {
                const authtoken = response.body?.access_token || '';
                this.userService.salvarToken(authtoken);
             })
           )
  }

}
