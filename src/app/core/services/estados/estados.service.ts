import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Estado } from '../../../shared/types/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  private apiUrl = environment.apiUrl;
  http = inject(HttpClient);

  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.apiUrl}/estados`);
  }

}
