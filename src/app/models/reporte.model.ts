export interface MovimientoReporteDto {
  id: number;
  fecha: string;
  tipoMovimiento: string;
  valor: number;
  saldoInicial: number;
  saldo: number;
  cuentaId: number;
  numeroCuenta: string;
}

export interface CuentaReporteDto {
  numeroCuenta: string;
  tipoCuenta: string;
  saldoDisponible: number;
  totalCreditos: number;
  totalDebitos: number;
  movimientos: MovimientoReporteDto[];
}

export interface ReporteDto {
  clienteId: number;
  clienteNombre: string;
  desde: string;
  hasta: string;
  cuentas: CuentaReporteDto[];
}
