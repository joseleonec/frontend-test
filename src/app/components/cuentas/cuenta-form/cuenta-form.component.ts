import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentaService } from '../../../services/cuenta.service';

@Component({
  selector: 'app-cuenta-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cuenta-form.component.html',
  styleUrl: './cuenta-form.component.css'
})
export class CuentaFormComponent implements OnInit {
  form: FormGroup;
  isEditing = false;
  cuentaId: number | null = null;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private cuentaService: CuentaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      numeroCuenta: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      tipoCuenta:   ['Ahorros', Validators.required],
      saldoInicial: [0, [Validators.required, Validators.min(0)]],
      estado:       [true],
      clienteId:    ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.cuentaId = +id;
      this.cuentaService.getById(this.cuentaId).subscribe(data => this.form.patchValue(data));
    }
  }

  isInvalid(name: string): boolean {
    const f = this.form.get(name);
    return !!(f?.invalid && f?.touched);
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isSubmitting = true;
    this.errorMessage = '';

    const payload = { ...this.form.value, clienteId: +this.form.value.clienteId };

    const req$ = this.isEditing && this.cuentaId !== null
      ? this.cuentaService.update(this.cuentaId, payload)
      : this.cuentaService.create(payload);

    req$.subscribe({
      next: () => this.router.navigate(['/cuentas']),
      error: err => {
        this.errorMessage = err?.error?.error || 'Error al guardar la cuenta.';
        this.isSubmitting = false;
      }
    });
  }

  cancelar(): void { this.router.navigate(['/cuentas']); }
}
