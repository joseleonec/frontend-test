import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReporteDto } from '../models/reporte.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReporteService {
  private url = `${environment.apiUrl}/reportes`;

  constructor(private http: HttpClient) {}

  getReporte(clienteid: string, desde: string, hasta: string): Observable<ReporteDto> {
    const params = new HttpParams()
      .set('clienteid', clienteid)
      .set('fechaDesde', desde)
      .set('fechaHasta', hasta);
    return this.http.get<ReporteDto>(this.url, { params });
  }

  getReportePdf(clienteid: string, desde: string, hasta: string): Observable<Blob> {
    const params = new HttpParams()
      .set('clienteid', clienteid)
      .set('fechaDesde', desde)
      .set('fechaHasta', hasta);
    return this.http.get(this.url, {
      params,
      headers: { Accept: 'application/pdf' },
      responseType: 'blob'
    });
  }
}
