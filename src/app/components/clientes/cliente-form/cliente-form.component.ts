import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent implements OnInit {
  form: FormGroup;
  isEditing = false;
  clienteId: number | null = null;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre:        ['', [Validators.required, Validators.maxLength(100)]],
      genero:        ['', Validators.required],
      edad:          ['', [Validators.required, Validators.min(0), Validators.max(150)]],
      identificacion:['', [Validators.required, Validators.maxLength(20)]],
      direccion:     ['', Validators.maxLength(200)],
      telefono:      ['', Validators.maxLength(20)],
      clienteid:     ['', [Validators.required, Validators.maxLength(50)]],
      contrasena:    ['', [Validators.required, Validators.minLength(4)]],
      estado:        [true]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.clienteId = +id;
      this.clienteService.getById(this.clienteId).subscribe(data => {
        this.form.patchValue(data);
        this.form.get('contrasena')?.clearValidators();
        this.form.get('contrasena')?.updateValueAndValidity();
      });
    }
  }

  field(name: string) {
    return this.form.get(name);
  }

  isInvalid(name: string): boolean {
    const f = this.field(name);
    return !!(f?.invalid && f?.touched);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    this.errorMessage = '';

    const payload = this.form.value;

    const request$ = this.isEditing && this.clienteId !== null
      ? this.clienteService.update(this.clienteId, payload)
      : this.clienteService.create(payload);

    request$.subscribe({
      next: () => this.router.navigate(['/clientes']),
      error: err => {
        this.errorMessage = err?.error?.message || 'Error al guardar el cliente.';
        this.isSubmitting = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/clientes']);
  }
}
