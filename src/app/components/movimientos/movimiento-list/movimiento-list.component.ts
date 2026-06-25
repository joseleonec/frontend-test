import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MovimientoResponse } from '../../../models/movimiento.model';
import { MovimientoService } from '../../../services/movimiento.service';

@Component({
  selector: 'app-movimiento-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movimiento-list.component.html',
  styleUrl: './movimiento-list.component.css'
})
export class MovimientoListComponent implements OnInit {
  movimientos: MovimientoResponse[] = [];
  filterText = '';

  constructor(private movimientoService: MovimientoService, private router: Router) {}

  ngOnInit(): void {
    this.loadMovimientos();
  }

  loadMovimientos(): void {
    this.movimientoService.getAll().subscribe(data => this.movimientos = data);
  }

  get filtered(): MovimientoResponse[] {
    const q = this.filterText.toLowerCase();
    return this.movimientos.filter(m =>
      Object.values(m).some(v => String(v).toLowerCase().includes(q))
    );
  }

  nuevo(): void {
    this.router.navigate(['/movimientos/create']);
  }

  eliminar(id: number): void {
    if (confirm('¿Está seguro de eliminar este movimiento?')) {
      this.movimientoService.delete(id).subscribe(() => this.loadMovimientos());
    }
  }
}
