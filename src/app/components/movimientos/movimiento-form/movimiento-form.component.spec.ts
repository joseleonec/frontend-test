import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { MovimientoFormComponent } from './movimiento-form.component';
import { MovimientoService } from '../../../services/movimiento.service';
import { Router } from '@angular/router';
import { MovimientoResponse } from '../../../models/movimiento.model';

const mockResponse: MovimientoResponse = {
  id: 1, fecha: '2024-01-15T10:00:00', tipoMovimiento: 'CREDITO',
  valor: 500, saldo: 2500, cuentaId: 1, numeroCuenta: '478758'
};

describe('MovimientoFormComponent', () => {
  let fixture: ComponentFixture<MovimientoFormComponent>;
  let component: MovimientoFormComponent;
  let movimientoServiceSpy: jasmine.SpyObj<MovimientoService>;

  beforeEach(async () => {
    movimientoServiceSpy = jasmine.createSpyObj('MovimientoService', ['create']);

    await TestBed.configureTestingModule({
      imports: [MovimientoFormComponent],
      providers: [
        { provide: MovimientoService, useValue: movimientoServiceSpy },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovimientoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be invalid when cuentaId is missing', () => {
    component.form.get('cuentaId')?.setValue('');
    component.form.get('valor')?.setValue(100);
    expect(component.form.invalid).toBeTrue();
  });

  it('should display "Saldo no disponible" message on 422 error', () => {
    movimientoServiceSpy.create.and.returnValue(
      throwError(() => ({ error: { error: 'Saldo no disponible' } }))
    );

    component.form.setValue({ cuentaId: '1', tipoMovimiento: 'DEBITO', valor: 99999 });
    component.onSubmit();

    expect(component.errorMessage).toBe('Saldo no disponible');
  });

  it('should display success message after successful registration', () => {
    movimientoServiceSpy.create.and.returnValue(of(mockResponse));

    component.form.setValue({ cuentaId: '1', tipoMovimiento: 'CREDITO', valor: 500 });
    component.onSubmit();

    expect(component.successMessage).toContain('2500');
  });

  it('should be invalid when valor is zero or negative', () => {
    component.form.get('cuentaId')?.setValue('1');
    component.form.get('valor')?.setValue(0);
    expect(component.form.get('valor')?.invalid).toBeTrue();
  });
});
