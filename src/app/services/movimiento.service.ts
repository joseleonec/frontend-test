import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovimientoRequest, MovimientoResponse } from '../models/movimiento.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MovimientoService {
  private url = `${environment.apiUrl}/movimientos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<MovimientoResponse[]> {
    return this.http.get<MovimientoResponse[]>(this.url);
  }

  create(dto: MovimientoRequest): Observable<MovimientoResponse> {
    return this.http.post<MovimientoResponse>(this.url, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
