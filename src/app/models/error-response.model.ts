export interface ErrorResponse {
  timestamp: string;
  status: number;
  path: string;
  error: string | string[];
}
