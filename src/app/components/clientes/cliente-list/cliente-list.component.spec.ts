import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ClienteListComponent } from './cliente-list.component';
import { ClienteService } from '../../../services/cliente.service';
import { Router } from '@angular/router';
import { ClienteResponse } from '../../../models/cliente.model';

const mockClientes: ClienteResponse[] = [
  { id: 1, nombre: 'Jose Lema', genero: 'Masculino', edad: 30, identificacion: '1234567890',
    direccion: 'Otavalo sn', telefono: '098254785', clienteid: 'joselema', estado: true },
  { id: 2, nombre: 'Marianela Montalvo', genero: 'Femenino', edad: 25, identificacion: '9876543210',
    direccion: 'Amazonas sn', telefono: '097548965', clienteid: 'marianela', estado: true }
];

describe('ClienteListComponent', () => {
  let fixture: ComponentFixture<ClienteListComponent>;
  let component: ClienteListComponent;
  let clienteServiceSpy: jasmine.SpyObj<ClienteService>;

  beforeEach(async () => {
    clienteServiceSpy = jasmine.createSpyObj('ClienteService', ['getAll', 'delete']);
    clienteServiceSpy.getAll.and.returnValue(of(mockClientes));

    await TestBed.configureTestingModule({
      imports: [ClienteListComponent],
      providers: [
        { provide: ClienteService, useValue: clienteServiceSpy },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display all clients returned by the service', () => {
    expect(component.clientes.length).toBe(2);
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('Jose Lema');
    expect(fixture.nativeElement.textContent).toContain('Marianela Montalvo');
  });

  it('should filter clients by search text', () => {
    component.filterText = 'jose';
    expect(component.filtered.length).toBe(1);
    expect(component.filtered[0].nombre).toBe('Jose Lema');

    component.filterText = 'xyz';
    expect(component.filtered.length).toBe(0);
  });
});
