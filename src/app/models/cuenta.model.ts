export interface CuentaRequest {
  numeroCuenta: string;
  tipoCuenta: string;
  saldoInicial: number;
  estado: boolean;
  clienteid: string;
}

export interface CuentaResponse {
  id: number;
  numeroCuenta: string;
  tipoCuenta: string;
  saldoInicial: number;
  estado: boolean;
  clienteId: number;
  clienteNombre: string;
}
