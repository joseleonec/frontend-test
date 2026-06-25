import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ClienteResponse } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent implements OnInit {
  clientes: ClienteResponse[] = [];
  filterText = '';

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clienteService.getAll().subscribe(data => this.clientes = data);
  }

  get filtered(): ClienteResponse[] {
    const q = this.filterText.toLowerCase();
    return this.clientes.filter(c =>
      Object.values(c).some(v => String(v).toLowerCase().includes(q))
    );
  }

  crear(): void {
    this.router.navigate(['/clientes/create']);
  }

  editar(id: number): void {
    this.router.navigate(['/clientes/edit', id]);
  }

  eliminar(id: number): void {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
      this.clienteService.delete(id).subscribe(() => this.loadClientes());
    }
  }
}
