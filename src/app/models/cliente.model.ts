export interface ClienteRequest {
  nombre: string;
  genero: string;
  edad: number;
  identificacion: string;
  direccion: string;
  telefono: string;
  clienteid: string;
  contrasena: string;
  estado: boolean;
}

export interface ClienteResponse {
  id: number;
  nombre: string;
  genero: string;
  edad: number;
  identificacion: string;
  direccion: string;
  telefono: string;
  clienteid: string;
  estado: boolean;
}
