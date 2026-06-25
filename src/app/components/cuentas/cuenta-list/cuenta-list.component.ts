import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CuentaResponse } from '../../../models/cuenta.model';
import { CuentaService } from '../../../services/cuenta.service';

@Component({
  selector: 'app-cuenta-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cuenta-list.component.html',
  styleUrl: './cuenta-list.component.css'
})
export class CuentaListComponent implements OnInit {
  cuentas: CuentaResponse[] = [];
  filterText = '';

  constructor(private cuentaService: CuentaService, private router: Router) {}

  ngOnInit(): void {
    this.loadCuentas();
  }

  loadCuentas(): void {
    this.cuentaService.getAll().subscribe(data => this.cuentas = data);
  }

  get filtered(): CuentaResponse[] {
    const q = this.filterText.toLowerCase();
    return this.cuentas.filter(c =>
      Object.values(c).some(v => String(v).toLowerCase().includes(q))
    );
  }

  crear(): void {
    this.router.navigate(['/cuentas/create']);
  }

  editar(id: number): void {
    this.router.navigate(['/cuentas/edit', id]);
  }

  eliminar(id: number): void {
    if (confirm('¿Está seguro de eliminar esta cuenta?')) {
      this.cuentaService.delete(id).subscribe(() => this.loadCuentas());
    }
  }
}
