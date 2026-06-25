import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovimientoService } from '../../../services/movimiento.service';

@Component({
  selector: 'app-movimiento-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movimiento-form.component.html',
  styleUrl: './movimiento-form.component.css'
})
export class MovimientoFormComponent {
  form: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private movimientoService: MovimientoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      cuentaId:       ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      tipoMovimiento: ['CREDITO', Validators.required],
      valor:          [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  isInvalid(name: string): boolean {
    const f = this.form.get(name);
    return !!(f?.invalid && f?.touched);
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload = {
      ...this.form.value,
      cuentaId: +this.form.value.cuentaId,
      valor: +this.form.value.valor
    };

    this.movimientoService.create(payload).subscribe({
      next: res => {
        this.successMessage = `Movimiento registrado exitosamente. Nuevo saldo: ${res.saldo}`;
        this.isSubmitting = false;
        this.form.reset({ tipoMovimiento: 'CREDITO', valor: null, cuentaId: '' });
      },
      error: err => {
        this.errorMessage = err?.error?.error || err?.error?.message || 'Error al registrar el movimiento.';
        this.isSubmitting = false;
      }
    });
  }

  verLista(): void {
    this.router.navigate(['/movimientos']);
  }
}
