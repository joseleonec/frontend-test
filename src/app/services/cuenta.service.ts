import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CuentaRequest, CuentaResponse } from '../models/cuenta.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CuentaService {
  private url = `${environment.apiUrl}/cuentas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<CuentaResponse[]> {
    return this.http.get<CuentaResponse[]>(this.url);
  }

  getById(id: number): Observable<CuentaResponse> {
    return this.http.get<CuentaResponse>(`${this.url}/${id}`);
  }

  create(dto: CuentaRequest): Observable<CuentaResponse> {
    return this.http.post<CuentaResponse>(this.url, dto);
  }

  update(id: number, dto: CuentaRequest): Observable<CuentaResponse> {
    return this.http.put<CuentaResponse>(`${this.url}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
