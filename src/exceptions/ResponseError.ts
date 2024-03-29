export interface ResponseError {
  code: number;
  status: string;
  method: string;
  cause: string;
  message: string;
  timestamps: string;
  url: string;
  params: string;
}
