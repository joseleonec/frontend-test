import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteDto } from '../../../models/reporte.model';
import { ReporteService } from '../../../services/reporte.service';
import { ReporteSearchComponent, ReporteSearchCriteria } from '../reporte-search/reporte-search.component';

@Component({
  selector: 'app-reporte-view',
  standalone: true,
  imports: [CommonModule, ReporteSearchComponent],
  templateUrl: './reporte-view.component.html',
  styleUrl: './reporte-view.component.css'
})
export class ReporteViewComponent {
  reporte: ReporteDto | null = null;
  isLoading = false;
  errorMessage = '';
  criteria: ReporteSearchCriteria | null = null;

  constructor(private reporteService: ReporteService) {}

  onSearch(criteria: ReporteSearchCriteria): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.reporte = null;
    this.criteria = criteria;

    this.reporteService.getReporte(criteria.clienteId, criteria.desde, criteria.hasta).subscribe({
      next: data => { this.reporte = data; this.isLoading = false; },
      error: err  => {
        this.errorMessage = err?.error?.message || 'No se pudo generar el reporte.';
        this.isLoading = false;
      }
    });
  }

  descargarPdf(): void {
    if (!this.criteria) return;
    this.reporteService.getReportePdf(
      this.criteria.clienteId, this.criteria.desde, this.criteria.hasta
    ).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reporte-cliente-${this.criteria!.clienteId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  volver(): void {
    this.reporte = null;
    this.errorMessage = '';
    this.criteria = null;
  }
}
