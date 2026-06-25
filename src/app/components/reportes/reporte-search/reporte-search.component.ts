import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface ReporteSearchCriteria {
  clienteId: number;
  desde: string;
  hasta: string;
}

@Component({
  selector: 'app-reporte-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reporte-search.component.html',
  styleUrl: './reporte-search.component.css'
})
export class ReporteSearchComponent {
  @Output() search = new EventEmitter<ReporteSearchCriteria>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      clienteId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      desde:     ['', Validators.required],
      hasta:     ['', Validators.required]
    });
  }

  isInvalid(name: string): boolean {
    const f = this.form.get(name);
    return !!(f?.invalid && f?.touched);
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.search.emit({ ...this.form.value, clienteId: +this.form.value.clienteId });
  }
}
