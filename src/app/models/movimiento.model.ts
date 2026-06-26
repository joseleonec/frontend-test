export interface MovimientoRequest {
  numeroCuenta: string;
  tipoMovimiento: 'CREDITO' | 'DEBITO';
  valor: number;
}

export interface MovimientoResponse {
  id: number;
  fecha: string;
  tipoMovimiento: string;
  valor: number;
  saldoInicial: number;
  saldo: number;
  cuentaId: number;
  numeroCuenta: string;
}
