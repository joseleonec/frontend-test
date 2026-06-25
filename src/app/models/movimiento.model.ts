export interface MovimientoRequest {
  cuentaId: number;
  tipoMovimiento: 'CREDITO' | 'DEBITO';
  valor: number;
}

export interface MovimientoResponse {
  id: number;
  fecha: string;
  tipoMovimiento: string;
  valor: number;
  saldo: number;
  cuentaId: number;
  numeroCuenta: string;
}
