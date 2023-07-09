interface RequestError {
  code: number;
  status: string;
  method: string;
  cause: string;
  message: string;
  timestamps: string;
  url: string;
  params: string;
}

export default RequestError;
